/**
 * 工具函数
 * @param cookie 
 */

/** cookie相关的URL属性转换成URL */
export function createUrlFromCookie (cookie: chrome.cookies.Cookie) {
  return 'http' + (cookie.secure ? 's' : '') + '://' + cookie.domain + cookie.path;
}