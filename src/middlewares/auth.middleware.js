const jwt = require("jsonwebtoken");

exports.authMiddleware = function (req, res, next) {
  const { headers } = req;
  // const proxyAuthorization = headers["proxy-authorization"];
  const proxyAuthorization = headers["prx-auth"];
  const { JWT_SECRET, PROXY_PASSWORD } = process.env;
  if (!JWT_SECRET) return res.status(500).end();

  try {
    if (!proxyAuthorization) {
      throw new Error("Authorization token required.");
    }

    const match = proxyAuthorization.match(/^Bearer (.*)$/);
    if (!match) {
      throw new Error("Invalid authorization token.");
    }

    const token = match[1];
    const payload = jwt.verify(token, JWT_SECRET);

    // if (payload.proxyId !== PROXY_ID) {
    //   throw new Error("The proxy server with the given ID doesn't exist.");
    // }

    if (payload.password !== PROXY_PASSWORD) {
      throw new Error("Wrong password.");
    }
    
    delete req.headers["prx-auth"];
    next();
  } catch (error) {
    console.log({ headers });
    console.error(error);
    res.setHeader('Proxy-Authenticate', 'Bearer realm="Access to the internal site."');
    res.status(407).json({ ok: 0, message: error.message });
  }
}
