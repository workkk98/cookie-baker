/**
 * @file 复制以及粘贴
 */

import { getSingleCookie, setCookie, judgeCookie, getAllCookie } from 'src/chrome/cookies';
import { copy } from 'iclipboard';

export default async function copyThenPaste (origin: string, target: string, name: string) {
  const cookie = await getSingleCookie({
    name,
    url: origin
  })

  if (cookie === null) {
    console.warn(`啊哦，没找到对应的cookie，确认下url:${origin}, name: ${name}`);
    return;
  }

  if (judgeCookie(cookie)) {
    await setCookie(target, name, cookie.value);
    console.log('cookie复制与粘贴已生效')
  }
}

/**
 * 复制某个域名下的所有cookie
 * @param { string } origin
 */
export async function copyAllCookies (origin: string) {
  const cookies = await getAllCookie({
    url: origin
  });

  let cookiesJson = '';
  try {
    cookiesJson = cookies.reduce((acc, cookie)  => `${acc}${cookie.name}=${cookie.value}; `, '');
  } catch (err) {
    console.error(err);
  }

  return copy(cookiesJson.trim());
}
