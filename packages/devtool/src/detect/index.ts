import { interval } from "rxjs";

// 只要打开devtool，该进程都会运行
const task = interval(60 * 1000);
export const stack: unknown[] = [];

task.subscribe(() => {
  chrome.devtools?.inspectedWindow.eval(
    'window.location.href',
    {},

    // @ts-ignore
    (result) => {
      stack.push({
        type: typeof result,
        value: result,
        time: new Date().toString()
      });
    }
  );
})