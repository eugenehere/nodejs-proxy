const jwt = require('jsonwebtoken');

class AuthController {
  static async signIn(req, res) {
    const { JWT_SECRET, PROXY_USERNAME, PROXY_PASSWORD } = process.env;
    const authorization = req.header["Proxy-Authorization"];

    try {
      if (!authorization) {
        throw new Error("Proxy-Authorization required to sign-up.");
      }
  
      const match = authorization.match(/^Basic (.*)$/);
      if (!match) {
        throw new Error("Invalid authorization token.");
      }

      const token = match[1];

      const payload = jwt.verify(token, JWT_SECRET);
      // verify payload.username
      // verify payload.password

    } catch (error) {
      res.setHeader('Proxy-Authenticate', 'Basic realm=Access to token.');
      return res.status(407).json({ ok: 0, message: error.message });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: 60 });

    res.status(200).json({ ok: 1, token });
  }
}

exports.AuthController = AuthController;