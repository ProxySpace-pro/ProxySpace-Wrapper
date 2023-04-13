# ProxySpace Wrapper Docs

In this document you can look through and over the library reference.
`npm i proxyspace@latest`

### Examples

First let's start with some examples before going further deep.

#### Example 1

```js
const { ProxySpaceV2 } = require("proxyspace");

var util = new ProxySpaceV2();
util.proxySpace.defaults.timeout = 10000;

util.Proxify("http", "array").then((proxyList) => {
  util.CheckProxy(proxyList, "http", (err, res) => {
    process.stdout.write(res);
  });
});
```

This will scrape HTTP proxies and check them. Every time a check is completed it calls up the callback you have given. It works in an in-memory enqueue for rapid checking with non blocking IO.

We can also define a functionality to the module, to use proxies while connecting to the ProxySpace API and so on. For that purpose we can define custom headers, proxy and timeout at class initialization level. You can later on, after the initialization any time manipulate it by `<class>.proxySpace` property.

**_ Lets go deeper into that with an example_**

```js
const { ProxySpaceV2 } = require("proxyspace");
const { ProxySpace_Countries } = require("proxyspace/dist/@types");

(async () => {
  var util = new ProxySpaceV2(
    {
      "cache-control": "no-store",
    },
    {
      auth: {
        username: "rvugmczm",
        password: "3j296ogi3b86",
      },
      host: "2.56.119.93",
      port: 5074,
      protocol: "http",
    }
  );
  util.proxySpace.defaults.timeout = 2000;

  let subnet = await util.IP_Rangify(ProxySpace_Countries.NL);
  subnet.net.forEach((sub) => {
    sub.ip.forEach((sub_ips) => {
      process.stdout.write(sub_ips + "\n");
    });
  });
})();
```

This will use the given proxy with the given AUTH at all requests to the ProxySpace API, if `auth` property was not defined it would use no authentication for the proxy server. What this code is doing is to get all IP ranges and then extract all IPs in the IP ranges.

We could also do something like:

```js
const { ProxySpaceV2 } = require("proxyspace")(async () => {
  var util = new ProxySpaceV2(
    {
      "cache-control": "no-store",
    },
    {
      auth: {
        username: "rvugmczm",
        password: "3j296ogi3b86",
      },
      host: "2.56.119.93",
      port: 5074,
      protocol: "http",
    }
  );
  util.proxySpace.defaults.timeout = 2000;
  let geolocation = await util.GeoLocation("84.212.11.23");

  console.log(geolocation);
})();

// Output
/*{
  asn_number: 41164,
  asn_organization: 'Telia Norge AS',
  city: 'Kristiansand',
  country: 'Norway',
  country_code: 'NO',
  ip: '84.212.11.23',
  latitude: 58.1495,
  longitude: 7.9604,
  postal_code: '4617',
  time_zone: 'Europe/Oslo',
  speed: '836.20 MS'
}
*/
```

and so on...

After these examples, lets dive into the real library referrence!

# Classes

- `ProxySpace`

- `ProxySpaceV2` extends `ProxySpace`

In all cases use `ProxySpaceV2`class

# Class: ProxySpaceV2:

### Constructor

accesor: `(headers?: {[key: string]: string}, proxy?: ProxyConfig, timeout?: number)`

**Example**

```js
const { ProxySpaceV2 } = require("proxyspace");

var util = new ProxySpaceV2(
  {
    "cache-control": "no-store",
  },
  undefined,
  3000
);
```

Our module will use the header given at argument position 1, because argument 2 is undefined it won't be using a proxy and the third argument is the global timeout for all requests. Later on after initialization you can anytime change these behaviors by the `<class>.proxySpace.defaults.timeout` properties etc... Example to add proxy if we didnt add it at initialization time but wanted to add it later on:

```js
const { ProxySpaceV2 } = require("proxyspace");

var util = new ProxySpaceV2(
  {
    "cache-control": "no-store",
  },
  undefined,
  3000
);

util.proxySpace.defaults.proxy = {
  auth: {
    username: "rvugmczm",
    password: "3j296ogi3b86",
  },
  host: "2.56.119.93",
  port: 5074,
  protocol: "http",
};
```

### Methods

#### `GeoLocation(ip?: string): Promise<GEO_API_RESPONSE>`

If `ip` is not defined it will lookup your local IP.

`GEO_API_RESPONSE` is a JSON object:

```json
{
    asn_number: number;
    asn_organization: string;
    city: string;
    country: string;
    country_code: string;
    ip: string;
    latitude: number;
    longitude: number;
    postal_code: string;
    time_zone: string;
    speed: string;
}
```

#### `**Uptime**(): Promise<API_UPTIME>`

Gets the ProxySpace API uptime.

`API_UPTIME` is a JSON object:

```json
{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    weeks: number;
    years: number;
    speed: string;
}
```

#### `IP_Rangify(country: ProxySpace_Countries = ProxySpace_Countries.US): Promise<Subnet>`

`country` is a country code with uppercases. You can do something like this to use our predefined constant enum values:

```js
const { ProxySpaceV2 } = require("proxyspace");
const { ProxySpace_Countries } = require("proxyspace/dist/@types");

(async () => {
  var util = new ProxySpaceV2(
    {
      "cache-control": "no-store",
    },
    undefined,
    2000
  );

  let subnets = await util.IP_Rangify(ProxySpace_Countries.NL);
})();
```

`Subnet` is a JSON object:

```json
{
    net: Array<{
        ip: Netmask;
        country: ProxySpace_Countries;
        live: "yes" | "no" | "not-checked";
    }>;
}
```

#### `Proxify(protocol: ProxyProtocols, output: "array" | "plaintext"): Promise<Buffer | Array<string>>`

`ProxyProtocols` can be one of `"http" | "https" | "socks4" | "socks5"`

`output` controls the behave about what kind of object to return from the method. In this case either an `array` or `plaintext`.

#### `CheckProxy(proxyList: Array<string>, protocol: "http" | "https" | "socks4" | "socks5", callback: (err: Error | null, res: any) => any): boolean`

`proxyList` has to be an array of Proxies in `<ip>:<port>` format. You can use `Proxify` method to get proxylists from our API.

`protocol` has to be one of: `"http" | "https" | "socks4" | "socks5"`

`callback` this is the function to execute to provide back the working proxies. So the `res` argument (2th arg) will contain the working proxy.

`callback` needs to be a function with `err: Error | null, res: any`

Because proxy checking uses a in-memory worker enqueue pool to check within rapid speed. Each working proxy will call the callback again! So `res` does not contain all working proxies at once, it calls once upon a proxy.

#### Example

```js
const { ProxySpaceV2 } = require("proxyspace");

var util = new ProxySpaceV2();
util.proxySpace.defaults.timeout = 10000;

util.Proxify("http", "array").then((proxyList) => {
  util.CheckProxy(proxyList, "http", (err, res) => {
    process.stdout.write(res);
  });
});
```

# Credits

- ProxySpace

- Z3NTL3 - lead maintainer of the module
