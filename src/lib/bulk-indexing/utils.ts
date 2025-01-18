export function filterValidUrls(urls: string[]) {
    return urls.map(u => {
        try {
            const url = new URL(u)
            return url.toString();
        } catch {
            return null;
        }
    })
    .filter(url => url !== null);
}