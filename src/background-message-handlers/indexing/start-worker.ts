import { MessageHandler, StatusResponse } from "../type";
import { startWorker as startBackgroundWorker } from '../../lib/bulk-indexing/worker';

export type StartWorkerRequest = {
    type: 'startWorker',
    payload: null,
}

export const startWorker : MessageHandler<StartWorkerRequest, StatusResponse> = async (
    request, sender, sendResponse
) => {
    try {
        startBackgroundWorker();
        sendResponse({ success: true })
    } catch (e) {
        console.log(e);
        sendResponse({ success: false, message: (e as Error).message || 'Something went wrong' })
    }
}