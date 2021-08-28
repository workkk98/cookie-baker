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

  // devtool通知background，拿到tab
  port.onMessage.addListener(async function(msg) {
    // msg.url = target

    console.log(msg);

    // 通过事件信息来做分发。
    if (msg.url) {
      // 获取标签页ID，并执行脚本
      const targetId = await getTargetResource(msg.url);
      const results = await executeScriptOnTab(targetId);
      console.log(results);
      port.postMessage({ 
        event: 'reload',
        cookie: results.cookie,
        localStorage: JSON.parse(results.localStorage)
      });
    }
  });
});

// url 等于一个string
function getTargetResource (url) {
  console.log(url);
  return new Promise(function (resolve, reject) {
    // tabs: tab[]
    // match - pattern只能是协议 + domain + path 不带端口
    // 是不是直接能查询活动页面，然后background直接查询它的remote
    chrome.tabs.query({ url: 'http://localhost/*' }, function (tabs) {
      console.log('查询tab', tabs);
      resolve(tabs[0].id);
    });
  });
}

// dmp-devtools
const excuteCode = `
  (function () {
    console.log('executeScript success!');

    // 取cookie和localStorage
    console.log(document.cookie);
    console.log(window.localStorage);
    return {
      cookie: document.cookie,
      localStorage: JSON.stringify(window.localStorage)
    }
  })()
`;

function executeScriptOnTab (id) {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.executeScript(id, { code: excuteCode }, (results) => {
        // TODO: results是个数组的原因？
        resolve(results[0]);
      });
    } catch (e) {
      console.error('在目标tab执行脚本发生错误');
      console.error(e);
      reject();
    }
  })
}