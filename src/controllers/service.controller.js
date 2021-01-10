const { http, https } = require("follow-redirects");
const { terminal } = require("terminal-kit");
const { URL } = require("url");
const { modifyResponseBody, createQueryString, setResponseHeaders } = require("../helpers/service.helper");

class ServiceController {
  static async proxy(proxyRequest, proxyResponse) {
    const { SERVICE_URL } = process.env;
    const requestUrl = new URL(SERVICE_URL + proxyRequest.path);
    const httpModule = requestUrl.protocol === "https:" ? https : http;
    const { query, body, method } = proxyRequest;
    const queryString = createQueryString(query);
    const requestBody = body.length ? body.toString() : "";
    const headers = { ...proxyRequest.headers };

    headers.host = requestUrl.hostname;
    headers["accept-encoding"] = "";
    headers["content-length"] = "0";
    if (body) {
      headers["content-length"] = String(Buffer.byteLength(requestBody));
    }

    const requestOptions = {
      hostname: requestUrl.hostname,
      path: requestUrl.pathname + queryString,
      protocol: requestUrl.protocol,
      method,
      headers,
    };

    const serviceRequest = httpModule
      .request(requestOptions, (serviceResponse) => {
        let data = "";

        serviceResponse.on("data", (chunk) => {
          data += chunk;
        });

        serviceResponse.on("end", () => {
          proxyResponse.statusCode = serviceResponse.statusCode;
          const { headers } = serviceResponse;
          setResponseHeaders(proxyResponse, headers);
          proxyResponse.end(modifyResponseBody(data));
        });
      })
      .on("error", (error) => {
        terminal.bold.red(error, "\n");
      });
    
    serviceRequest.write(requestBody);
    serviceRequest.end();
  }
}

exports.ServiceController = ServiceController;