export function parseUrls(text: string) {
    const urls = text.split("\n")
        .map(line => line.trim())
        .filter(line => {
            try {
                new URL(line);
                return true;
            } catch(e) {
                return false;
            }
        });
    return urls; 
}