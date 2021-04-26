/**
 * @file cookie的API
 */

export function judgeCookie (cookie: any): cookie is chrome.cookies.Cookie {
  return Object.prototype.toString.call(cookie) === '[object Object]' && cookie.domain && cookie.path; 
}

/**
 * 写入cookie
 * @param url 完整的http，URL包括协议域名路径
 * @param name 
 * @param value 
 */
export function setCookie (url: string, name: string, value: string) {
  return new Promise((resolve, reject) => {
    chrome.cookies.set({
      url,
      name: name,
      value: value
    }, (cookie) => {
      console.log('cookie-set', cookie);
      if (!cookie) reject(null);
      resolve(cookie);
    });
  });
}

/**
 * 获取所有的cookie
 * details是个对象
 */
export function getAllCookie (details?: chrome.cookies.GetAllDetails): Promise< chrome.cookies.Cookie[] > {
  return new Promise((resolve, reject) => {
    chrome.cookies?.getAll(details || {}, function(cookies) {
      resolve(cookies);
    });
  });
}

/**
 * 查询单个cookie
 * @param details 参数里面的url是一个完整的url
 * This argument may be a full URL, in which case any data following the URL path
 * @returns {chrome.cookies.Cookie | null}
 */
export function getSingleCookie (details: chrome.cookies.Details) {
  return new Promise((resolve, reject) => {
    chrome.cookies?.get(details, function(cookie) {
      resolve(cookie);
    });
  });
}