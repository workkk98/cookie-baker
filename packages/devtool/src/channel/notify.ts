/**
 * @file 通知background.ts
 */

export function getInspectedWinURL (callback: (resources: chrome.devtools.inspectedWindow.Resource[]) => void) {
    chrome.devtools.inspectedWindow.getResources((resources) => {
      callback(resources);
    })
}
