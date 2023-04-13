import axios, { AxiosInstance } from "axios";
import { API_UPTIME, GEO_API_RESPONSE, ProxyConfig, ProxySpace_Countries, Subnet, ProxyProtocols } from "./@types/index";
import { Netmask } from "netmask";
import fastq from "fastq";
import type { queue, done } from "fastq";

const ip_and_port_format = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{1,5})$/

type Task = {
    proxy: string,
    proxySpace: AxiosInstance,
    protocol: "http" | "https" | "socks4" | "socks5"
}
  
const pool: queue<Task> = fastq((arg: Task, cb: done) =>{
    let valids = ""
    let ctx = arg.proxy
    ctx = ctx.trim()
    ctx = ctx.replaceAll(/\s/g, '');

    if(ctx.length > 3 && !ip_and_port_format.test(ctx)){
        return cb(new Error("Invalid proxy format only <ip>:<port> is supported"), null)
    }

    let ip = ctx.split(":")[0]
    let port = ctx.split(":")[1]

    
    arg.proxySpace.get("https://geo.proxyspace.pro/ip", {
        proxy: {
            host: ip,
            port: Number(port),
            protocol: arg.protocol  
        }, 
        headers: {
            "content-type": "application/json"
        }
    }).then((res) => {
        let data = res.data
        if(data.ip === ip){
            valids += `${arg.protocol}://${ip}:${port}\n`
            return cb(null,valids)
        }
    }).catch((err) =>{
        return
    })
}, 1000)


class ProxySpace {
    public proxySpace: AxiosInstance

    constructor(headers?: {[key: string]: string}, proxy?: ProxyConfig, timeout?: number){
        this.proxySpace = axios.create({
            headers: {
                "Content-Type": "application/json"
            },
            baseURL: "https://geo.proxyspace.pro",
            timeout: 5000
        })

        if(typeof proxy !== "undefined") this.proxySpace.defaults.proxy = proxy
        if(typeof timeout !== "undefined") this.proxySpace.defaults.timeout = timeout
        if(typeof headers !== "undefined") this.proxySpace.defaults.headers = headers as any
    }

    public GeoLocation(ip?: string): Promise<GEO_API_RESPONSE> {
       return new Promise((resolve,reject)=>{
        let start = performance.now()

        // if ip is undefined fall back to local ip
        this.proxySpace.get(`/ip${ip ? `/${ip}` : '/'}`).then((res) => {
                if(res.status >= 200 && res.status <= 399){
                    let end = performance.now()
                    let ctx: GEO_API_RESPONSE = res.data

                    ctx.speed = this.MeasureSpeed(start,end)
    
                    return resolve(ctx)
                } else reject(new Error(`API responded with a failure status code: ${res.status}`))
            }).catch((err) => reject(err as Error))
       })
    }

    public Uptime(): Promise<API_UPTIME>{
        return new Promise((resolve,reject) => { 
            let start = performance.now()
            this.proxySpace.get(`/uptime`).then((res) => {
                if(res.status >= 200 && res.status <= 399){
                    let end = performance.now()
                    let ctx: API_UPTIME = res.data

                    ctx.speed = this.MeasureSpeed(start,end)
    
                    return resolve(ctx)
                } else reject(new Error(`API responded with a failure status code: ${res.status}`))
            }).catch((err) => reject(err as Error))
        })
    }

    private MeasureSpeed(start: number,end: number): string {        
        return Number(end - start).toFixed(2) + " MS"
    }
}


class ProxySpaceV2 extends ProxySpace{
    constructor(headers?: {[key: string]: string}, proxy?: ProxyConfig, timeout?: number){
        super(headers, proxy, timeout)
        this.proxySpace.defaults.headers.get = {"Content-Type": "text/plain"}
    }

    public IP_Rangify(country: ProxySpace_Countries = ProxySpace_Countries.US): Promise<Subnet>{
        return new Promise((resolve,reject) =>{
            try {
                this.proxySpace.get(`/Ranges/${country}.txt`, {baseURL: "https://proxyspace.pro"}).then(async (res) =>{
                    let body = res.data
                    body = body.trim('\n').split("\n") as Array<string>
    
                    let range: Array<{ip: Netmask, country: ProxySpace_Countries, live: "yes" | "no" | "not-checked"}> = []
                    for(var i = 0; i < body.length; i++){
                        let ip = body[i]


                        let subnet = new Netmask(ip)
                        range.push({
                            ip: subnet,
                            country: country,
                            live: "not-checked"
                        })
                               
                    }
                    return resolve({net: range})
                })
            } catch(err){
                return reject(err as Error)
            }
        }) 
    }

    public Proxify(protocol: ProxyProtocols, output: "array" | "plaintext")
    : Promise<Buffer | Array<string>> {
        return new Promise((resolve, reject) =>{
            try {
                let proxy: ProxyProtocols = "http"

                if(protocol === "https") proxy = "https"
                if(protocol === "socks") proxy = "socks"

                this.proxySpace.get(`/${protocol}.txt`,  {baseURL: "https://proxyspace.pro"}).then((res) =>{
                    
                    let body = res.data
                    if(output === "plaintext") return resolve(Buffer.from(body))

                    body = body.split("\n") as Array<string>
                    let dataset: Array<string> = []

                    for(var i = 0; i < body.length; i++){
                        dataset.push(`${body[i]}`)
                    }

                    return resolve(dataset)
                }).catch((err) => {
                    return reject(err as Error)
                })
            } catch(err){
                return reject(err as Error)
            }
        })
    }

    public CheckProxy(
        proxyList: Array<string>, 
        protocol: "http" | "https" | "socks4" | "socks5", 
        callback: (err: Error | null, res: any) => any): boolean{
        for(var i = 0; i < proxyList.length; i++){
            pool.push({proxy: proxyList[i], proxySpace: this.proxySpace, protocol}, callback)
        }
        return true
    }
};

export { ProxySpace, ProxySpaceV2 }
