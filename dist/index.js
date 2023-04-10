"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxySpace = void 0;
/**
 * Example
 */
const axios_1 = __importDefault(require("axios"));
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
