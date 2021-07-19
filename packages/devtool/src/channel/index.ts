// devtool-panel页面和background页面间的通讯。

// TODO：这里可能有问题
const port = chrome.runtime.connect({
  name: 'devtool2background'
})

// 这里需要定义一个msg的类型
port.onMessage.addListener(function(msg: any) {
  console.log(msg);
});

port.postMessage({joke: "Knock knock"});