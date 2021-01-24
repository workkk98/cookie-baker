const __version = "0.1.0";

// 插件第一次安装后调用，或是更新插件或是更新浏览器
chrome.runtime.onInstalled.addListener(function() {
  console.log(`welcome to use cookie baker: ${__version}`);

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // pageChang的时候，增加rule
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'localhost'},
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});