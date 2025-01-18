import { publish, PublishType } from '../indexing-api';
import { DailyLimitExceededError, NetworkError, NoCredsWithUnusedQuotaError } from '../indexing-api/errors';
import * as pagesRepo from './pages-repo';

let running = false;

const waitFor = (ms=5000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    })
}

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
            try {
    
                // dummy call to make sure worker doesn't get terminated
                await chrome.runtime.getPlatformInfo();

                // Change status to processing
                await pagesRepo.updatePage(page.id!, {
                    'status': 'processing',
                });

                // submit for indexing
                await publish({
                    type: PublishType.URL_UPDATED,
                    url: page.url
                });

                // mark success
                await pagesRepo.updatePage(page.id!, {
                    'status': 'submitted',
                    'last_submitted_at': new Date().getTime(),
                });

            } catch (e) {
    
                // Network error
                // Either alarm or network listener would retry
                if (e instanceof NetworkError) {
                    await pagesRepo.updatePage(page.id!, {
                        'status': 'pending',
                        'last_submitted_at': new Date().getTime(),
                        'error_message': 'Network error',
                    });
                    running = false;
                    return;
                }

                // Daily quota exceeded
                // Either alarm or network listener would retry
                if (e instanceof DailyLimitExceededError) {
                    await pagesRepo.updatePage(page.id!, {
                        'status': 'pending',
                        'last_submitted_at': new Date().getTime(),
                        'error_message': 'Daily quota exceeded',
                    });
                    running = false;
                    return;
                }

                // Daily quota exceeded
                // Either alarm or network listener would retry
                if (e instanceof NoCredsWithUnusedQuotaError) {
                    await pagesRepo.updatePage(page.id!, {
                        'status': 'pending',
                        'last_submitted_at': new Date().getTime(),
                        'error_message': 'No creds with unused quota',
                    });
                    running = false;
                    return;
                }

                // Something went wrong
                await pagesRepo.updatePage(page.id!, {
                    'status': 'error',
                    'last_submitted_at': new Date().getTime(),
                    'error_message': (e as Error).message,
                });
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