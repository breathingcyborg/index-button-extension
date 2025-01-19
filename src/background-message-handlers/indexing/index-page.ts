import { indexPage as indexPageOperation } from "@src/lib/bulk-indexing/index-page";
import { MessageHandler, StatusResponse } from "../type";
import { findPageById } from "@src/lib/bulk-indexing/pages-repo";

export type IndexPageRequest = {
    type: 'indexPage',
    payload: { pageId: number }
}

export const indexPage : MessageHandler<IndexPageRequest, StatusResponse> = async (
    request, sender, sendResponse
) => {
    try {
        const pageId = request.payload.pageId;
        const page = await findPageById(pageId);
        if (!page) {
            sendResponse({ success: false, message: 'page not found' })
            return
        }
        const response = await indexPageOperation(page)
        sendResponse({ success: response.success, message: response.errorMessage })
    } catch (e) {
        console.log(`Indexing page failed`);
        console.log(e);
        sendResponse({ success: false, message: (e as Error).message || 'Something went wrong' })
    }
}