export function isExtensionURL(url: URL) {
    return url.protocol === 'chrome-extension'
}