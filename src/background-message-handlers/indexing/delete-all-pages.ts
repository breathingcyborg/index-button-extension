import { MessageHandler, StatusResponse } from "../type";
import { deleteAllPages as deleteAll } from '../../lib/bulk-indexing/pages-repo';

export type DeleteAllPagesRequest = {
    type: 'deleteAllPages',
}

export const deleteAllPages : MessageHandler<DeleteAllPagesRequest, StatusResponse> = async (
    request, sender, sendResponse
) => {
    try {
        await deleteAll();
        sendResponse({ success: true })
    } catch (e) {
        console.log(`Deleting all pages failed`);
        console.log(e);
        sendResponse({ success: false, message: (e as Error).message || 'Something went wrong' })
    }
}