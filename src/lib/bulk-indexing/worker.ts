import { indexPage } from './index-page';
import * as pagesRepo from './pages-repo';

let running = false;

async function submitPagesInBackground() {
    running = true;
    while (true) {

        const pages = await pagesRepo.getPendingPages(10);

        // No pages to process
        if (pages.length <= 0) {
            running = false;
            return
        }

        for (let page of pages) {

            // dummy call to make sure worker doesn't get terminated
            await chrome.runtime.getPlatformInfo();

            const response = await indexPage(page);
            if (response.shouldTerminateWorker) {
                running = false;
                return;
            }
        }
    }
}

export function startWorker() {
    if (running) {
        return
    }
    submitPagesInBackground();
}