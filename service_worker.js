importScripts("user_agent.js");

const RULE_ID = 1;
const COMPATIBILITY_EXCLUDED_DOMAINS = [
  "chatgpt.com",
  "openai.com",
  "cloudflare.com",
  "hcaptcha.com"
];
const REQUEST_RESOURCE_TYPES = [
  "main_frame",
  "sub_frame",
  "stylesheet",
  "script",
  "image",
  "font",
  "object",
  "xmlhttprequest",
  "ping",
  "csp_report",
  "media",
  "websocket",
  "other"
];

function buildRequestHeaders() {
  return [
    {
      header: "user-agent",
      operation: "set",
      value: EDGE_USER_AGENT
    },
    ...Object.entries(EDGE_CLIENT_HINT_HEADERS).map(([header, value]) => ({
      header,
      operation: "set",
      value
    }))
  ];
}

async function installRule() {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_ID],
    addRules: [
      {
        id: RULE_ID,
        priority: 1,
        action: {
          type: "modifyHeaders",
          requestHeaders: buildRequestHeaders()
        },
        condition: {
          regexFilter: "^https?://",
          resourceTypes: REQUEST_RESOURCE_TYPES,
          excludedRequestDomains: COMPATIBILITY_EXCLUDED_DOMAINS,
          excludedInitiatorDomains: COMPATIBILITY_EXCLUDED_DOMAINS
        }
      }
    ]
  });
}

chrome.runtime.onInstalled.addListener(() => {
  installRule().catch(console.error);
});

chrome.runtime.onStartup.addListener(() => {
  installRule().catch(console.error);
});

installRule().catch(console.error);
