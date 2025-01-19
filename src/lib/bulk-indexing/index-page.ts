import { publish, PublishType } from "../indexing-api";
import { DailyLimitExceededError, NetworkError, NoCredsWithUnusedQuotaError } from "../indexing-api/errors";
import { Page } from "./pages-repo";
import * as pagesRepo from './pages-repo';

type IndexPageResponse = {
    success: boolean
    shouldTerminateWorker: boolean
    errorMessage?: string
}

export async function indexPage(page: Page) : Promise<IndexPageResponse> {
    console.debug({ page })
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

        return {
            success: true,
            shouldTerminateWorker: false,
        }

    } catch (e) {

        // Network error
        // Either alarm or network listener would retry
        if (e instanceof NetworkError) {
            const errorMessage = 'Network Error';
            await pagesRepo.updatePage(page.id!, {
                'status': 'pending',
                'last_submitted_at': new Date().getTime(),
                'error_message': errorMessage,
            });
            return {
                success: false,
                shouldTerminateWorker: true,
                errorMessage: errorMessage,
            }
        }

        // Daily quota exceeded
        // Either alarm or network listener would retry
        if (e instanceof DailyLimitExceededError) {
            const errorMessage = 'Daily quota exceeded';
            await pagesRepo.updatePage(page.id!, {
                'status': 'pending',
                'last_submitted_at': new Date().getTime(),
                'error_message': errorMessage,
            });
            return {
                success: false,
                shouldTerminateWorker: true,
                errorMessage,
            }
        }

        // Daily quota exceeded
        // Either alarm or network listener would retry
        if (e instanceof NoCredsWithUnusedQuotaError) {
            const errorMessage = 'No credentials with unused quota'
            await pagesRepo.updatePage(page.id!, {
                'status': 'pending',
                'last_submitted_at': new Date().getTime(),
                'error_message': errorMessage,
            });
            return {
                success: false,
                shouldTerminateWorker: true,
                errorMessage,
            }
        }

        const errorMessage = (e as Error).message;

        // Something went wrong
        await pagesRepo.updatePage(page.id!, {
            'status': 'error',
            'last_submitted_at': new Date().getTime(),
            'error_message': errorMessage,
        });

        return {
            success: false,
            shouldTerminateWorker: false,
            errorMessage,
        }
    }
}