/**
 * @file 复制以及粘贴
 */

import { getSingleCookie, setCookie, judgeCookie } from 'src/chrome/cookies';

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