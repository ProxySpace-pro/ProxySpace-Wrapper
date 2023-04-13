"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxySpaceV2 = exports.ProxySpace = void 0;
const axios_1 = __importDefault(require("axios"));
const index_1 = require("./@types/index");
const netmask_1 = require("netmask");
const fastq_1 = __importDefault(require("fastq"));
const ip_and_port_format = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{1,5})$/;
const pool = (0, fastq_1.default)((arg, cb) => {
    let valids = "";
    let ctx = arg.proxy;
    ctx = ctx.trim();
    ctx = ctx.replaceAll(/\s/g, '');
    if (ctx.length > 3 && !ip_and_port_format.test(ctx)) {
        return cb(new Error("Invalid proxy format only <ip>:<port> is supported"), null);
    }
    let ip = ctx.split(":")[0];
    let port = ctx.split(":")[1];
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
        let data = res.data;
        if (data.ip === ip) {
            valids += `${arg.protocol}://${ip}:${port}\n`;
            return cb(null, valids);
        }
    }).catch((err) => {
        return;
    });
}, 1000);
class ProxySpace {
    proxySpace;
    constructor(headers, proxy, timeout) {
        this.proxySpace = axios_1.default.create({
            headers: {
                "Content-Type": "application/json"
            },
            baseURL: "https://geo.proxyspace.pro",
            timeout: 5000
        });
        if (typeof proxy !== "undefined")
            this.proxySpace.defaults.proxy = proxy;
        if (typeof timeout !== "undefined")
            this.proxySpace.defaults.timeout = timeout;
        if (typeof headers !== "undefined")
            this.proxySpace.defaults.headers = headers;
    }
    GeoLocation(ip) {
        return new Promise((resolve, reject) => {
            let start = performance.now();
            // if ip is undefined fall back to local ip
            this.proxySpace.get(`/ip${ip ? `/${ip}` : '/'}`).then((res) => {
                if (res.status >= 200 && res.status <= 399) {
                    let end = performance.now();
                    let ctx = res.data;
                    ctx.speed = this.MeasureSpeed(start, end);
                    return resolve(ctx);
                }
                else
                    reject(new Error(`API responded with a failure status code: ${res.status}`));
            }).catch((err) => reject(err));
        });
    }
    Uptime() {
        return new Promise((resolve, reject) => {
            let start = performance.now();
            this.proxySpace.get(`/uptime`).then((res) => {
                if (res.status >= 200 && res.status <= 399) {
                    let end = performance.now();
                    let ctx = res.data;
                    ctx.speed = this.MeasureSpeed(start, end);
                    return resolve(ctx);
                }
                else
                    reject(new Error(`API responded with a failure status code: ${res.status}`));
            }).catch((err) => reject(err));
        });
    }
    MeasureSpeed(start, end) {
        return Number(end - start).toFixed(2) + " MS";
    }
}
exports.ProxySpace = ProxySpace;
class ProxySpaceV2 extends ProxySpace {
    constructor(headers, proxy, timeout) {
        super(headers, proxy, timeout);
        this.proxySpace.defaults.headers.get = { "Content-Type": "text/plain" };
    }
    IP_Rangify(country = index_1.ProxySpace_Countries.US) {
        return new Promise((resolve, reject) => {
            try {
                this.proxySpace.get(`/Ranges/${country}.txt`, { baseURL: "https://proxyspace.pro" }).then(async (res) => {
                    let body = res.data;
                    body = body.trim('\n').split("\n");
                    let range = [];
                    for (var i = 0; i < body.length; i++) {
                        let ip = body[i];
                        let subnet = new netmask_1.Netmask(ip);
                        range.push({
                            ip: subnet,
                            country: country,
                            live: "not-checked"
                        });
                    }
                    return resolve({ net: range });
                });
            }
            catch (err) {
                return reject(err);
            }
        });
    }
    Proxify(protocol, output) {
        return new Promise((resolve, reject) => {
            try {
                let proxy = "http";
                if (protocol === "https")
                    proxy = "https";
                if (protocol === "socks")
                    proxy = "socks";
                this.proxySpace.get(`/${protocol}.txt`, { baseURL: "https://proxyspace.pro" }).then((res) => {
                    let body = res.data;
                    if (output === "plaintext")
                        return resolve(Buffer.from(body));
                    body = body.split("\n");
                    let dataset = [];
                    for (var i = 0; i < body.length; i++) {
                        dataset.push(`${body[i]}`);
                    }
                    return resolve(dataset);
                }).catch((err) => {
                    return reject(err);
                });
            }
            catch (err) {
                return reject(err);
            }
        });
    }
    CheckProxy(proxyList, protocol, callback) {
        for (var i = 0; i < proxyList.length; i++) {
            pool.push({ proxy: proxyList[i], proxySpace: this.proxySpace, protocol }, callback);
        }
        return true;
    }
}
exports.ProxySpaceV2 = ProxySpaceV2;
;
