# cookie-baker

一款管理cookie的插件。

### 目前的功能

1. cookie管理
2. cookie追踪

### 如何开发

```s
yarn serve
```

lerna一些命令
```s
lerna create package-name

# <command>是必须
lerna exec [...args] -- <command>
# 例如 lerna exec --scope devtool -- yarn run serve

# Install lerna for access to the lerna CLI.
lerna add module-1 packages/prefix-*
lerna add module-1 --scope=module-2
```

### 一些笔记

```js
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
```

### 打包生产

```shell
yarn build
```

将cookie-baker-extension插件导入到浏览器chrome浏览器中即可。

### 其他模块

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)