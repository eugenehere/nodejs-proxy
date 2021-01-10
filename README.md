# Node.js proxy server

A simple proxy server written in Node.js.

## Installation

```bash
npm install
```

Copy `.example.env` to `.env`

Set the following environment variables:

`SERVICE_URL` - service (target) url (e.g. https://jsonplaceholder.typicode.com);

`PROXY_URL` - proxy server url. This is where our server is running (e.g. http://localhost);

`JWT_SECRET` - JWT secret used to encrypt an access token (any string);

`PROXY_PASSWORD` - proxy server password (any string);

`PORT` - the port which the server will be listening to. Remember that some services may set this variable automatically, in that case you shouldn't override its value;

## Usage

To get access to the proxy server you need to provide `Prx-Auth` request header with this value: 

`Bearer <your access token>`

It's using a custom header `Prx-Auth` because some services can block the `Proxy-Authorization` header.

#### Generating JWT

The server authenticates clients according to JWT standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)). Here is all the information you need to generate a JSON Web Token:

##### Header

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

##### Payload
```
{
  "password": "<proxy server password>",
  "iat": <NumericDate>, // the time at which the JWT was issued (optional)
  "exp": <NumericDate> // see below
}
```

##### Secret
Use a secret defined in `.env` file (is not base64 encoded).

###### "exp" (Expiration Time) Claim
The "exp" (expiration time) claim identifies the expiration time on
or after which the JWT MUST NOT be accepted for processing.  The
processing of the "exp" claim requires that the current date/time
MUST be before the expiration date/time listed in the "exp" claim.

###### NumericDate
A JSON numeric value representing the number of seconds from
1970-01-01T00:00:00Z UTC until the specified UTC date/time,
ignoring leap seconds.  This is equivalent to the IEEE Std 1003.1,
2013 Edition [POSIX.1] definition "Seconds Since the Epoch", in
which each day is accounted for by exactly 86400 seconds, other
than that non-integer values can be represented.  See RFC 3339
[RFC3339] for details regarding date/times in general and UTC in
particular.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.