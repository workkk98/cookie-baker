/**
 * @file 策略文件
 */

import { setCookie } from 'src/chrome/cookies';

abstract class TraceStrategy {
  public hit (strategyName: string): boolean {
    return true;
  }

  public excute (target: string, name: string, value: string) {
    //
  }
}


class CopyStrategy implements TraceStrategy {
  private name = 'copy';

  public hit (strategyName: string) {
    return strategyName === this.name;
  }

  public excute (target: string, name: string, value: string) {
    console.log('excute: ', target, name, value);
    setCookie(target, name, value);
  }
}

export const traceStrategyList = [
  new CopyStrategy()
];