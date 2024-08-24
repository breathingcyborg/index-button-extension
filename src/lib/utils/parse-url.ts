export  function  parseURL(url: string | null | undefined) {
    if (!url) {
        return null;
    }

    try {
        return new URL(url);
    } catch(e) {
        return null;
    }
}