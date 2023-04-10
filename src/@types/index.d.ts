export type GEO_API_RESPONSE = {
    asn_number: number,
    asn_organization: string,
    city: string,
    country: string,
    country_code: string,
    ip: string,
    latitude: number,
    longitude: number,
    postal_code: string,
    time_zone: string
    speed: string
}

export type API_UPTIME = {
    days: number
    hours: number
    minutes: number
    seconds: number
    weeks: number
    years: number
    speed: string
}

export type ProxyConfig = {
    host: string,
    port: number,
    auth: {
        username: string,
        password: string
    }
}

// {"days":5,"hours":0,"minutes":44,"seconds":6,"weeks":1,"years":0}