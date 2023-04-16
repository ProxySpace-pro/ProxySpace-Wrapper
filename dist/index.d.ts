/// <reference types="node" />
import { AxiosInstance } from "axios";
import { API_UPTIME, GEO_API_RESPONSE, ProxyConfig, ProxySpace_Countries, Subnet, ProxyProtocols } from "./@types/index";
declare class ProxySpace {
    proxySpace: AxiosInstance;
    constructor(headers?: {
        [key: string]: string;
    }, proxy?: ProxyConfig, timeout?: number);
    GeoLocation(ip?: string): Promise<GEO_API_RESPONSE>;
    Uptime(): Promise<API_UPTIME>;
    private MeasureSpeed;
}
declare class ProxySpaceV2 extends ProxySpace {
    constructor(headers?: {
        [key: string]: string;
    }, proxy?: ProxyConfig, timeout?: number);
    IP_Rangify(country?: ProxySpace_Countries): Promise<Subnet>;
    Proxify(protocol: ProxyProtocols, output: "array" | "plaintext"): Promise<Buffer | Array<string>>;
    CheckProxy(proxyList: Array<string>, protocol: "http" | "https" | "socks4" | "socks5", timeoutMS: number, callback: (err: Error | null, res: any) => any): boolean;
}
export { ProxySpace, ProxySpaceV2 };
