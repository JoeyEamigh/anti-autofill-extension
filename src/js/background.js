chrome.webNavigation.onCompleted.addListener(async (data) => {
  const blockList = (await getBlockList()) || [];
  // console.log(data);

  blockList.forEach((url) => {
    // console.log(data.url.includes(url));
    if (data.url.includes(url)) injectScript(data.tabId);
  });
});

function injectScript(tabId) {
  // chrome.tabs.executeScript(tabId, {
  //   code: 'document.body.style.backgroundColor="orange"',
  // });
  chrome.tabs.executeScript(tabId, {
    file: 'content.bundle.js',
  });
}

async function getBlockList() {
  return new Promise((resolve) => {
    chrome.storage.local.get('urls', (data) => {
      resolve(data.urls);
    });
  });
}
