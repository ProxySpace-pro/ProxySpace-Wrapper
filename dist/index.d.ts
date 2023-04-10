import { API_UPTIME, GEO_API_RESPONSE, ProxyConfig } from "./@types";
declare class ProxySpace {
    private proxySpace;
    constructor(headers?: {
        [key: string]: string;
    }, proxy?: ProxyConfig, timeout?: number);
    GeoLocation(ip?: string): Promise<GEO_API_RESPONSE>;
    Uptime(): Promise<API_UPTIME>;
    private MeasureSpeed;
}
export { ProxySpace };
