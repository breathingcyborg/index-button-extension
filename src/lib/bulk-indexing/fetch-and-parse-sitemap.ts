import axios, { isAxiosError } from "axios";
import { parseURL } from "../utils/parse-url";

class InvalidSitemap extends Error { }

export async function fetchAndParseSitemap(sitemapURL: string) {

    try {
        // check is xml sitemap url
        const parsedUrl = parseURL(sitemapURL);
        if (!parsedUrl || !sitemapURL.endsWith(".xml")) {
            throw new Error('invalid url only xml sitemap urls are supported');
        }

        // fetch sitemap
        const response = await axios.get(sitemapURL, { responseType: 'document' });
        const data = response.data;

        // check xml document is returned
        if (!data || !(data instanceof XMLDocument)) {
            throw new InvalidSitemap('invalid sitemap')
        }

        // parse and store urls
        const urls = parseSitemapUrls(data);
        return urls;


    } catch (e) {

        if (isAxiosError(e) && e.code === 'ERR_BAD_RESPONSE') {
            throw new InvalidSitemap('invalid sitemap')
        }

        throw e;
    }
}

function parseSitemapUrls(doc: XMLDocument) {
    const urls = Array.from(doc.querySelectorAll("url > loc"))
        .map(node => node.textContent?.trim() || "")
        .filter(url => {
            const parsed = parseURL(url);
            return Boolean(parsed) && !url.endsWith(".xml");
        });

    return urls;
}