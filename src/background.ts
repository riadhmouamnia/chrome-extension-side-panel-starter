/* eslint-disable @typescript-eslint/no-non-null-assertion */
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // listen for changes to the URL of any tab.
  if (
    changeInfo.url &&
    changeInfo.url.startsWith("https://www.youtube.com/watch")
  ) {
    chrome.runtime.sendMessage({
      message: "url_change",
      data: { url: changeInfo.url, tabId, tab, status: changeInfo.status },
    });
  }
});

// listen for tab change
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    let url = tab.url;
    if (url === "") {
      url = tab.pendingUrl;
    }
    chrome.runtime.sendMessage({
      message: "tab_change",
      data: { tabUrl: url },
    });
  });
});
