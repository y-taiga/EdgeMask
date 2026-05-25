(() => {
  const getChromeVersion = () => navigator.userAgent.match(/Chrome\/([\d.]+)/)?.[1] || "136.0.0.0";
  const normalizeVersion = (version) => {
    const parts = version.split(".");
    while (parts.length < 4) {
      parts.push("0");
    }
    return parts.slice(0, 4).join(".");
  };

  const edgeVersion = normalizeVersion(getChromeVersion());
  const edgeMajorVersion = edgeVersion.split(".")[0];
  const edgeUserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${edgeVersion} Safari/537.36 Edg/${edgeVersion}`;
  const edgeBrands = Object.freeze([
    Object.freeze({ brand: "Chromium", version: edgeMajorVersion }),
    Object.freeze({ brand: "Microsoft Edge", version: edgeMajorVersion }),
    Object.freeze({ brand: "Not.A/Brand", version: "99" })
  ]);
  const edgeFullVersionList = Object.freeze([
    Object.freeze({ brand: "Chromium", version: edgeVersion }),
    Object.freeze({ brand: "Microsoft Edge", version: edgeVersion }),
    Object.freeze({ brand: "Not.A/Brand", version: "99.0.0.0" })
  ]);

  const defineNavigatorGetter = (property, getter) => {
    try {
      Object.defineProperty(Navigator.prototype, property, {
        get: getter,
        configurable: true
      });
    } catch (_error) {
      try {
        Object.defineProperty(window.navigator, property, {
          get: getter,
          configurable: true
        });
      } catch (_nestedError) {
        // Some browser-managed properties may be locked on specific pages.
      }
    }
  };

  const cloneList = (list) => list.map((item) => ({ ...item }));

  defineNavigatorGetter("userAgent", () => edgeUserAgent);
  defineNavigatorGetter("appVersion", () => edgeUserAgent.replace(/^Mozilla\//, ""));
  defineNavigatorGetter("platform", () => "Win32");
  defineNavigatorGetter("vendor", () => "Google Inc.");
  defineNavigatorGetter("userAgentData", () => ({
    brands: cloneList(edgeBrands),
    mobile: false,
    platform: "Windows",
    getHighEntropyValues: async (hints = []) => {
      const values = {
        brands: cloneList(edgeBrands),
        mobile: false,
        platform: "Windows"
      };

      for (const hint of hints) {
        switch (hint) {
          case "architecture":
            values.architecture = "x86";
            break;
          case "bitness":
            values.bitness = "64";
            break;
          case "fullVersionList":
            values.fullVersionList = cloneList(edgeFullVersionList);
            break;
          case "model":
            values.model = "";
            break;
          case "platformVersion":
            values.platformVersion = "10.0.0";
            break;
          case "uaFullVersion":
            values.uaFullVersion = edgeVersion;
            break;
          case "wow64":
            values.wow64 = false;
            break;
          default:
            break;
        }
      }

      return values;
    },
    toJSON: () => ({
      brands: cloneList(edgeBrands),
      mobile: false,
      platform: "Windows"
    })
  }));
})();
