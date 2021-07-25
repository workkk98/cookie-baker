// devtool-panel页面和background页面间的通讯。
import { getInspectedWinURL } from './notify';

// TODO：这里可能有问题background需要计数。因为有多页面的问题。
const port = chrome.runtime.connect({
  name: 'devtool2background'
})

// 这里需要定义一个msg的类型
port.onMessage.addListener(function(msg: any) {
  console.log(msg);
});

// https://domain:port/components#/hash
// "http://localhost:8080/index.html?remote=http://localhost:8080"问题是他不会带hash
const regex = /remote=(https?:\/\/.*)\/?/;
function execute () {
  getInspectedWinURL(function (resources) {
    port.postMessage({msg: resources});
    const documentResource = resources.find((resource) => (resource as any).type === 'document');
    
    // 检查是否在联调
    const url = documentResource?.url.match(regex);
    port.postMessage({ msg: url});
  
    // 如果没有这个环境
    if (!url) {
      return;
    }
    port.postMessage({ url: url[1] });
  });
}

execute();