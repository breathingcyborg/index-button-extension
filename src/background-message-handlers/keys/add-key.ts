import { ServiceAccountCredsStorage } from "@src/lib/service-account";
import { MessageHandler, StatusResponse } from "../type";
import { validateServiceAccountJson } from "@src/lib/service-account/validate-json";

export type AddKeyRequest = {
    type: 'addKey',
    payload: { json: Object }
}

export const addKey : MessageHandler<AddKeyRequest, StatusResponse> = async (
    request, sender, sendResponse
) => {
    const { json } = request.payload;
    try {
        validateServiceAccountJson(json);
    } catch (e) {
        sendResponse({ success: false, message: (e as Error).message });
        return;
    }

    const store = new ServiceAccountCredsStorage();
    try {
        await store.insert(json as any);
        sendResponse({ success: true })
        return
    } catch(e) {
        console.log(e);
        sendResponse({ success: false, message: (e as Error).message })
        return
    }
}