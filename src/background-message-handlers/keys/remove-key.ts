import { ServiceAccountCredsStorage } from "@src/lib/service-account";
import { MessageHandler, StatusResponse } from "../type";

export type RemoveKeyRequest = {
    type: 'removeKey',
    payload: { index: number }
}

export const removeKey : MessageHandler<RemoveKeyRequest, StatusResponse> = async (
    request, sender, sendResponse
) => {
    const { index } = request.payload;
    const store = new ServiceAccountCredsStorage();
    try {
        await store.delete(index);
        sendResponse({ success: true })
    } catch(e) {
        console.log(e);
        sendResponse({ success: false, message: (e as Error).message })
    }
}