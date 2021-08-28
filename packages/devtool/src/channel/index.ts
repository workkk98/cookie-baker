// devtool-panel页面和background页面间的通讯。
import { getInspectedWinURL } from './notify';

// TODO：这里可能有问题background需要计数。因为有多页面的问题。
const port = chrome.runtime.connect({
  name: 'devtool2background'
})

// 这里是否能用下tapable之类的库?
type reloadCb = (
  msg: string,
  data: { cookie: string, localStorage: { [propName: string]: string} }
) => void;


export const eventBus: { reload: reloadCb[], subscribe: (eventName: string, callback: reloadCb) => void } = {
  reload: [],
  
  subscribe (eventName, callback) {
    // 如果eventName不存在？
    this.reload.push(callback);
  }
};

// 这里需要定义一个msg的类型
port.onMessage.addListener(function(msg: any) {
  console.log(msg);
  if (msg.event in eventBus) {
    // @ts-ignore
    eventBus[msg.event].forEach(cb => cb(msg.data));
  }
});

// https://domain:port/components#/hash
// "http://localhost:8080/index.html?remote=http://localhost:8080"问题是他不会带hash
const regex = /remote=(https?:\/\/.*)\/?/;
export function execute (message?: string) {
  getInspectedWinURL(function (resources) {
    port.postMessage({msg: resources});
    const documentResource = resources.find((resource) => (resource as any).type === 'document');
    
    // 检查是否在联调
    const url = documentResource?.url.match(regex);
  
    // 如果没有这个环境
    if (!url) {
      return;
    }
    port.postMessage({ url: url[1], msg: message });
  });
}

execute();