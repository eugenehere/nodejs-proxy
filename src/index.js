const express = require("express");
const { terminal } = require("terminal-kit");
const { serviceRouter } = require("./routers/service.router");
const { authRouter } = require("./routers/auth.router");
require("dotenv").config();

// const rootCas = require("ssl-root-cas").create();
// require("https").globalAgent.options.ca = rootCas;

const { SERVICE_URL, PROXY_URL, PORT = 3000 } = process.env;

const app = express();

// app.use("/auth", authRouter);
app.use("/", serviceRouter);

app.listen(PORT, () => {
  terminal.bold.yellow(`Starting at port: ${PORT}\n`);
  terminal.bold.yellow(`Proxy url: ${PROXY_URL}\n`);
  terminal.bold.yellow(`Service url: ${SERVICE_URL}\n`);
});
