import { MessageHandler, StatusResponse } from "../type";
import { publish, PublishType } from "@src/lib/indexing-api";

export type IndexUrlRequest = {
    type: 'indexUrl',
    payload: { url: string }
}

export const indexUrl : MessageHandler<IndexUrlRequest, StatusResponse> = async (
    request, sender, sendResponse
) => {
    const { url } = request.payload;
    try {
        await publish({
            type: PublishType.URL_UPDATED,
            url: url
        })
        sendResponse({ success: true })
    } catch (e) {
        console.log(`Indexing ${url} failed`);
        console.log(e);
        sendResponse({ success: false, message: (e as Error).message || 'Something went wrong' })
    }
}