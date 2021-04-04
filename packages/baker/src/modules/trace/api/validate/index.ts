/**
 * @file 校验form表单参数
 */

const domainExp = /\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/;
const ipExp = /(?:([01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d\d?|2[0-4]\d|25[0-5])/;
const specialExp = /localhost/;

function validateUrl (url: string) {
  return ipExp.test(url) || domainExp.test(url) || specialExp.test(url);
}

function validateName (name: string) {
  return typeof name === 'string' && !!name;
}

export function validateForm (name: string, origin: string, target: string) {
  return validateName(name) && validateUrl(origin) && validateUrl(target);
}