const __version = "0.2.0";

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
  var manager_url = chrome.extension.getURL("./baker/index.html");
  focusOrCreateTab(manager_url);
});

// 背景页建立连接
chrome.runtime.onConnect.addListener(function (port) {
  console.log(port.name === "devtool2background");
  port.onMessage.addListener(function(msg) {
    // msg.url = target

    console.log(msg);
    if (msg.url) {
      getTargetResource(msg.url);
    }
  });
});

// url 等于一个string
function getTargetResource (url) {
  return new Promise(function (resolve, reject) {
    // tabs: tab[]
    // match - pattern只能是协议 + domain + path 不带端口
    chrome.tabs.query({ url: 'http://localhost/*' }, function (tabs) {
      console.log(tabs);
      resolve(tabs[0]);
    });
  });
}