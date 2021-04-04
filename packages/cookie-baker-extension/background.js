const __version = "0.2.0";

// 插件第一次安装后调用，或是更新插件或是更新浏览器
// chrome.runtime.onInstalled.addListener(function() {
//   console.log(`welcome to use cookie baker: ${__version}`);

//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     // pageChang的时候，增加rule
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'localhost'},
//       })
//       ],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });

function focusOrCreateTab(url) {
  chrome.windows.getAll({"populate":true}, function(windows) {
    var existing_tab = null;
    for (var i in windows) {
      var tabs = windows[i].tabs;
      for (var j in tabs) {
        var tab = tabs[j];
        if (tab.url == url) {
          existing_tab = tab;
          break;
        }
      }
    }
    if (existing_tab) {
      chrome.tabs.update(existing_tab.id, {"selected":true});
    } else {
      chrome.tabs.create({"url":url, "selected":true});
    }
  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var manager_url = chrome.extension.getURL("./dist/index.html");
  focusOrCreateTab(manager_url);
});