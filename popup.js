const storageOriginDomain = 'storage_Origin_domain';
const storageCookieName = 'storage_cookie_name';
const storageTargetDomain = 'storage_target_domain';

const alertDOM = document.querySelector('#alert');
const setAlert = (msg) => alertDOM.textContent = msg;
const clearAlert = () => alertDOM.textContent = '';
const domainExp = /\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/;
const ipExp = /(?:([01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d\d?|2[0-4]\d|25[0-5])/;
const specialExp = /localhost/;

function validate (originDomain, cookieName, targetDomain) {
  let isValidOrigin = validateDomain(originDomain);
      isValidName = validateName(cookieName),
      isValidTarget = validateDomain(targetDomain)
  return isValidOrigin && isValidName && isValidTarget;
}

function validateDomain (cookieDomain) {
  let ans = ipExp.test(cookieDomain) || domainExp.test(cookieDomain) || specialExp.test(cookieDomain);

  if (!ans) {
    setAlert(`${cookieDomain} is incorrect.`);
  }
  return true;
}

function validateName (cookieName) {
  let ans = typeof cookieName === 'string' && !!cookieName;

  if (!ans) {
    setAlert('cookie-name is empty.');
  }
  return ans;
}

function getCookie (url, name, callback) {
  // url是完整的url
  chrome.cookies.get({url, name}, function (cookie) {
    if (!cookie) {
      alertDOM.textContent = 'cookie not exist.';
      return;
    }
    callback(cookie);
  });
}

function isSameCookie (domain, path, name) {
  return domain === 'localhost' && path === '/demo' && name === 'lady-cookie';
}

function setCookie (domain, name, value) {
  chrome.cookies.set({
    url: domain,
    name: name,
    value: value
  }, function (cookie) {
    if (!cookie) {
      // cookie设置错误
      alertDOM.innerHTML = 'set cookie error';
    }
  });
}

/**
 * 不同于localStorage等API，必须封装为对象，且是异步操作。
 * @param {*} key 
 * @param {*} value 
 */
function setStorageItem (key, value) {
  chrome.storage.sync.set({[key]: value}, function() {});
}

/**
 * 第一个参数是[key],对应chrome.storage.sync.set第一个参数的key。
 * @param { Array } key
 * @param {*} callback 
 */
function getStorageItem (key, callback) {
  chrome.storage.sync.get([key], function (value) {
    if (!value[key]) {
      return;
    }
    callback(value[key]);
  });
}

function main () {
  let originDomain = document.querySelector('#origin-domain'),
      targetDomain = document.querySelector('#target-domain'),
      cookieName = document.querySelector('#cookie-name'),
      saveBtn = document.querySelector('#save-btn');

  getStorageItem(storageOriginDomain, function (value) {
    originDomain.value = value;
  });

  getStorageItem(storageCookieName, function (value) {
    cookieName.value = value;
  })

  getStorageItem(storageTargetDomain, function (value) {
    targetDomain.value = value;
  })

  saveBtn.addEventListener('click', function () {
    let originDomainString = originDomain.value,
        cookieNameString = cookieName.value,
        targetDomainString = targetDomain.value;
  
    setStorageItem(storageOriginDomain, originDomainString);
    setStorageItem(storageCookieName, cookieNameString);
    setStorageItem(storageTargetDomain, targetDomainString);

    clearAlert();
    if (!validate(originDomainString, cookieNameString, targetDomainString)) {
      return;
    }
  
    getCookie(originDomainString, cookieNameString, function (cookie) {
      setCookie(targetDomainString, cookieNameString, cookie.value);
    });
  });
}

main();