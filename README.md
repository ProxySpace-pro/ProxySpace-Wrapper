# ProxySpace Wrapper Docs

In this document you can find descriptioned explanation of all objects in the ProxySpace module.

### Example

first let start with some examples

```js
const { ProxySpace } = require("proxyspace");
(async () => {
  let util = new ProxySpace({
    "cache-control": "no-cache",
  });
  util
    .GeoLocation("84.212.11.23")
    .then((ctx) => {
      console.log(ctx.ip);
    })
    .catch((err) => console.log(err));
})();
```

use custom headers, proxy and 2000MS timeout max for the whole request

```js
const { ProxySpace } = require("proxyspace");
(async () => {
  let util = new ProxySpace(
    {
      "cache-control": "no-cache",
    },
    {
      host: "localhost",
      port: 2000,
      auth: {
        username: "test",
        password: "ok",
      },
    },
    2000
  );
  util
    .GeoLocation("84.212.11.23")
    .then((ctx) => {
      console.log(ctx.ip);
      console.log(ctx); // all properties
    })
    .catch((err) => console.log(err));
})();
```

# Classes

- <a href="">ProxySpace</a>

# ProxySpace: Class Methods

- <a href="">GeoLocation</a>
- <a href="">Uptime</a>

# Class initialization

accesor `ProxySpace(headers?: {[key: string]: string}, proxy?: ProxyConfig, timeout?: number)`

When a argument is not declared at initialization level, then it'ill use
the default value.

`ProxyConfig` has the following properties required:

```
{
    host: string,
    port: number,
    auth: {
        username: string,
        password: string
    }
}
```

### Example

Look at the example below, 1st argument are the headers as a JSON/dict object, however
because we declared it as undefined the default headers are set. The second argument is the proxy to use,
mark as undefined if you are not willing to use proxy and the last (third) argument is the timeout in MS.

```js
let util = new ProxySpace(
  undefined,
  {
    host: "localhost",
    port: 2000,
    auth: {
      username: "test",
      password: "ok",
    },
  },
  2000
);
```

# GeoLocation method

accessor `<class>.GeoLocation(ip?: string): Promise<GEO_API_RESPONSE>`

Where `GEO_API_RESPONSE` corresponds the following `JSON` data:

When argument `IP` is not defined it will run a lookup on your local `IP`

```

{
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

```

### Example

```js
let util = new ProxySpace();
util
  .GeoLocation()
  .then((ctx) => {
    console.log(ctx.ip);
  })
  .catch((err) => console.log(err));
```

# Uptime method

accessor `<class>.Uptime(): Promise<API_UPTIME>`

Where `API_UPTIME` corresponds the following `JSON` data:

```
{
    days: number
    hours: number
    minutes: number
    seconds: number
    weeks: number
    years: number
    speed: string
}

```

### Example

```js
let util = new ProxySpace();
util
  .Uptime()
  .then((ctx) => {
    console.log(ctx.days);
  })
  .catch((err) => console.log(err));
```
