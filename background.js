const newReddit = "https://reddit.com";
const excludedPaths = [
  "/poll",
  "/rpan",
  "/settings",
  "/topics",
  "/community-points",
];

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);

    if (url.hostname === "reddit.com") return;

    for (const path of excludedPaths) {
      if (url.pathname.indexOf(path) === 0) return;
    }

    if (url.pathname.indexOf("/gallery") === 0) {
      return { redirectUrl: newReddit + url.pathname.slice("/gallery".length) };
    }

    return { redirectUrl: newReddit + url.pathname + url.search + url.hash };
  },
  {
    urls: [
      "*://old.reddit.com/*",
    ],
    types: [
      "main_frame",
      "sub_frame",
      "stylesheet",
      "script",
      "image",
      "object",
      "xmlhttprequest",
      "other",
    ],
  },
  ["blocking"]
);