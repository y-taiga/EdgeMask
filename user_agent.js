function getChromeVersion() {
  return globalThis.navigator?.userAgent?.match(/Chrome\/([\d.]+)/)?.[1] || "136.0.0.0";
}

function normalizeVersion(version) {
  const parts = version.split(".");
  while (parts.length < 4) {
    parts.push("0");
  }
  return parts.slice(0, 4).join(".");
}

const EDGE_VERSION = normalizeVersion(getChromeVersion());
const EDGE_MAJOR_VERSION = EDGE_VERSION.split(".")[0];

const EDGE_USER_AGENT = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${EDGE_VERSION} Safari/537.36 Edg/${EDGE_VERSION}`;

const EDGE_BRANDS = [
  { brand: "Chromium", version: EDGE_MAJOR_VERSION },
  { brand: "Microsoft Edge", version: EDGE_MAJOR_VERSION },
  { brand: "Not.A/Brand", version: "99" }
];

const EDGE_FULL_VERSION_LIST = [
  { brand: "Chromium", version: EDGE_VERSION },
  { brand: "Microsoft Edge", version: EDGE_VERSION },
  { brand: "Not.A/Brand", version: "99.0.0.0" }
];

const EDGE_CLIENT_HINT_HEADERS = {
  "sec-ch-ua": `"Chromium";v="${EDGE_MAJOR_VERSION}", "Microsoft Edge";v="${EDGE_MAJOR_VERSION}", "Not.A/Brand";v="99"`,
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-ch-ua-mobile": "?0"
};

if (typeof module !== "undefined") {
  module.exports = {
    EDGE_VERSION,
    EDGE_MAJOR_VERSION,
    EDGE_USER_AGENT,
    EDGE_BRANDS,
    EDGE_FULL_VERSION_LIST,
    EDGE_CLIENT_HINT_HEADERS
  };
}
