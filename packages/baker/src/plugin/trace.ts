import { strategyStorage } from 'src/modules/trace/api';
import { traceStrategyList } from 'src/modules/trace/api/strategy';
import { createUrlFromCookie } from 'src/utilty/url';

/**
 * 执行复制策略
 * @param url 源地址，协议域名路径
 */
async function excuteStrategy (url: string, cookie: chrome.cookies.Cookie) {
  const strategyList = await strategyStorage.get(false);

  // 移除copy-all这个策略
  const copyStrategy = strategyList.filter(item => item.strategy === 'copy');

  for (const form of copyStrategy) {
    const { origin, strategy, target, name } = form;

    console.log('策略: ', form);
    if (origin === url && name === cookie.name) {
      traceStrategyList.forEach(val => {
        val.hit(strategy) ? val.excute(target, name, cookie.value) : void 0;
      })
    }
  }
}

chrome.cookies?.onChanged?.addListener(function(info: chrome.cookies.CookieChangeInfo) {
  // cookie被重写，先会被移除在写入。
  if (info.removed) {
    return;
  }

  console.log('cookie变动', info.cookie);
  excuteStrategy(createUrlFromCookie(info.cookie), info.cookie);
});

// chrome.webRequest?.onBeforeRequest.addListener(function () {

// });