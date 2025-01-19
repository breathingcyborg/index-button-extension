import { MessageHandler, StatusResponse } from "../type";
import * as pagesRepo from '../../lib/bulk-indexing/pages-repo';

export type DeletePageRequest = {
    type: 'deletePage',
    payload: { pageId: number }
}

export const deletePage : MessageHandler<DeletePageRequest, StatusResponse> = async (
    request, sender, sendResponse
) => {
    try {
        const pageId = request.payload.pageId;
        await pagesRepo.deletePage(pageId);
        sendResponse({ success: true })
    } catch (e) {
        console.log(`Deleting page failed`);
        console.log(e);
        sendResponse({ success: false, message: (e as Error).message || 'Something went wrong' })
    }
}