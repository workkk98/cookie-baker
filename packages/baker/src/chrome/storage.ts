/**
 * 不同于localStorage等API，必须封装为对象，且是异步操作。
 * @param {*} key 
 * @param {*} value 
 */
export function setStorageItem (key: string, value: any): Promise< true | chrome.runtime.LastError> {
  return new Promise((resolve, reject) => {
    chrome.storage?.sync?.set({[key]: value}, function() {

      if (chrome.runtime?.lastError) {
        reject(chrome.runtime.lastError);
        chrome.runtime.lastError = void 0;
        return;
      }
      resolve(true);
    });
  });
}

/**
 * 获取单个键值对
 * @param { Array } key
 */
export function getStorageItem (key: string): Promise<string | chrome.runtime.LastError> {
  return new Promise((resolve, reject) => {
    chrome.storage?.sync?.get([key], function (value) {
      console.log('storage.sync.get: ', value[key]);

      if (chrome.runtime?.lastError) {
        reject(chrome.runtime.lastError);
        chrome.runtime.lastError = void 0;
        return;
      }

      // 未写入storage则未分配值。
      resolve(value[key] ?? '');
    });
  });
}

/**
 * 移除storage中的某个字段
 */
export function removeStorageItem (key: string): Promise< true | chrome.runtime.LastError> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.remove(key, () => {

      if (chrome.runtime?.lastError) {
        reject(chrome.runtime.lastError);
        chrome.runtime.lastError = void 0;
        return;
      }

      resolve(true);
    });
  })
}