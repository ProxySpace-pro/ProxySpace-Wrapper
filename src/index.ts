/**
 * Example
 */
import axios, { AxiosInstance } from "axios";
import { API_UPTIME, GEO_API_RESPONSE, ProxyConfig } from "./@types";


class ProxySpace {
    private proxySpace: AxiosInstance

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

export { ProxySpace }
