import { isExtensionURL } from "./is-extension-url";
import { parseURL } from "./parse-url";

export async function getCurrentUrl() {

    // we are not inside chrome extension page
    const parsedURL = parseURL(window.location.href);
    if (parsedURL && !isExtensionURL(parsedURL)) {
        return window.location.href;
    }

    // we are inside chrome extension page 
    // so we need to find currently active page
    // in current window.
    return new Promise<string>((resolve, reject) => {

        const error = new Error('Could not find current page. This could be because we are inside chrome extension page.')

        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, (tabs) => {

            if (tabs.length <= 0) {
                reject(error);
                return
            }

            const tab = tabs[0];
            const parsedURL = parseURL(tab.url);
            if (!parsedURL || isExtensionURL(parsedURL)) {
                reject(error);
                return;
            }
            
            resolve(tab.url as string);
        })
    })
}