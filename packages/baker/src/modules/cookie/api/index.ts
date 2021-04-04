/**
 * fetch cookie
 */

import { createUrlFromCookie } from '../../../utilty/url';

interface DataCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
}

const data = [
  {
    name: 'visitoridvisitoridvisitoridvisitoridvisitoridvisitoridvisitoridvisitoridvisitoridvisitoridvisitoridvisitoridvisitorid',
    value: '0f6803174d7c00001cbe2b6038000000290b00000f6803174d7c00001cbe2b6038000000290b00000f6803174d7c00001cbe2b6038000000290b00000f6803174d7c00001cbe2b6038000000290b00000f6803174d7c00001cbe2b6038000000290b00000f6803174d7c00001cbe2b6038000000290b00000f6803174d7c00001cbe2b6038000000290b00000f6803174d7c00001cbe2b6038000000290b00000f6803174d7c00001cbe2b6038000000290b00000f6803174d7c00001cbe2b6038000000290b00000f6803174d7c00001cbe2b6038000000290b0000',
    domain: 'www.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cnwww.bmw.com.cn',
    path: '/content/bmw/marketCN/bmw_com_cn/zh_CN/index/jcr:content/par/multicontent/tabs/multicontenttab_414046302/items/smallteaser_1006813621/image.transform/smallteaser'
  },
  {
    name: 'cf_chl_seq_ad6dda397271c74',
    value: '5c28ab63def3a41',
    domain: 'www.woodwood.com',
    path: '/cdn-cgi/challenge-platform/h/g/generate/ov1/0.15999413329210949:1603638120:43a2d323d06760329beb089d5ba890344ba1bdd91b3d605c963f92f85d478e4b/5e7cf2971df2eb5d'
  }
];

export async function fetchAllCookie (): Promise<DataCookie[]> {
  return new Promise(resolve => {
    chrome.cookies ? chrome.cookies.getAll({}, function(cookies: chrome.cookies.Cookie[]) {
      resolve(cookies);
    }) : resolve(new Array(20).fill(data[0]));
  });
}

export function removeCookie (cookie: chrome.cookies.Cookie) {
  const url = 'http' + (cookie.secure ? 's' : '') + '://' + cookie.domain +
            cookie.path;
  chrome.cookies?.remove({'url': url, 'name': cookie.name});
}

export function setCookie (form: chrome.cookies.Cookie) {
  const { name, value } = form;
  return new Promise((resolve, reject) => {
    chrome.cookies?.set({
      url: createUrlFromCookie(form),
      name,
      value
    }, (cookie) => {
      if (!cookie) {
        reject('set cookie error');
        return;
      }
      resolve(cookie);
    });
  })
}