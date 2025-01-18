import { queueForIndexing } from "@src/lib/bulk-indexing/queue-for-indexing";
import { MessageHandler, StatusResponse } from "../type";
import { startWorker } from "@src/lib/bulk-indexing/worker";

export type BulkIndexPagesRequest = {
    type: 'bulkIndexPages',
    payload: { urls: string[] }
}

export const bulkIndexPages : MessageHandler<BulkIndexPagesRequest, StatusResponse> = async (
    request, sender, sendResponse
) => {
    const { urls } = request.payload;

    try {

        await queueForIndexing(urls);

        // start worker if its not runnig
        startWorker();

        sendResponse({ success: true })

    } catch (e) {
        sendResponse({ success: false, message: (e as Error).message || 'Something went wrong' })
    }
}