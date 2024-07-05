import { MessageHandler, StatusResponse } from "../type";

export type CreateTabRequest = {
    type: 'createTab',
    payload: chrome.tabs.CreateProperties
}

export const createTab : MessageHandler<CreateTabRequest, StatusResponse> = async (
    request, sender, sendResponse
) => {
    chrome.tabs.create(request.payload);
    sendResponse({ success: true })
}