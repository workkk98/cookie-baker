# dmp-devtool

内部用的开发插件。

### 目前的功能

1. cookie管理
2. cookie追踪

### 开发进度

> 整个流程基本上打通了。

1. 多个页面都有建立port的情况？
2. event-name的管理，甚至可以引入tapable？
3. devtool页面的优化

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

# Run an npm script in each package that contains that script
# 直接跑packages中的脚本，不用加命令行工具
# accept all filter flags
lerna run <script> -- [..args]
lerna run --scope package-1 --scope *-2 lint


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