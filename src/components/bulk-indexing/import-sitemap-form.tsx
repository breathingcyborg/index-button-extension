import { useState } from "react";
import * as sitemapPagesRepo from '../../lib/bulk-indexing/sitemap-pages-repo';
import { fetchAndParseSitemap } from "@src/lib/bulk-indexing/fetch-and-parse-sitemap";
import { EnterSitemapUrlForm } from "./enter-sitemap-url-form";
import { SitemapUrlsSelector } from "./sitemap-urls-selector";

type Status = 'entering_url'
    | 'fetching_sitemap'
    | 'fetching_failed'
    | 'selecting_urls'
    | 'success';

export function ImportSitemapForm({ onSuccess }: { onSuccess: () => void | Promise<void> }) {
    const [status, setStatus] = useState<Status>('entering_url');

    const handleSitemapUrlSubmit = async (sitemapURL: string) => {
        if (!sitemapURL) {
            return;
        }

        try {

            setStatus('fetching_sitemap');

            // fetch, parse, persist
            const urls = await fetchAndParseSitemap(sitemapURL);
            await sitemapPagesRepo.deleteAllPages();
            await sitemapPagesRepo.addPages(urls);

            setStatus('selecting_urls');
        } catch(e) {
            setStatus('fetching_failed');
            throw e;
        }
    }

    const handleSelectionComplete = async() => {
        setStatus('success');
        onSuccess();
    }

    if (status === 'entering_url' || status === 'fetching_sitemap' || status === 'fetching_failed') {
        return <EnterSitemapUrlForm onSubmit={handleSitemapUrlSubmit} />
    }

    if (status === 'selecting_urls') {
        return <SitemapUrlsSelector onDone={handleSelectionComplete} />
    }

    if (status === 'success') {
        return <div>
            Success
        </div>
    }

    return <div>
        TODO: handle status {status}
    </div>
}

