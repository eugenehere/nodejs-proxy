exports.modifyResponseBody = (body) => {
  const {
    SERVICE_URL,
    PROXY_URL,
  } = process.env;

  const replaceRules = [
    // {
    //   search: new RegExp(SERVICE_URL, "g"),
    //   replace: PROXY_URL
    // }
  ];

  return replaceRules.reduce((acc, rule) => {
    return acc.replace(rule.search, rule.replace);
  }, body);
}

exports.createQueryString = (query) => {
  if (!query) return "";
  const tokens = Object.keys(query).map(name => `${name}=${query[name]}`);
  if (!tokens.length) return "";
  return "?" + tokens.join("&");
};

exports.setResponseHeaders = (response, headers) => {
  if (headers) {
    Object.keys(headers).forEach((name) => {
      response.setHeader(name, headers[name]);
    });
  }
}