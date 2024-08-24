import { MessageHandler, StatusResponse } from "../type";
import { ButtonSettings, ButtonSettingsRepo } from "@src/lib/button-settings/button-settings-repo";

export type SetButtonSettingsRequest = {
    type: 'setButtonSettings',
    payload: ButtonSettings
}

export const setButtonSettings : MessageHandler<SetButtonSettingsRequest, StatusResponse> = async (
    request, sender, sendResponse
) => {
    const store = new ButtonSettingsRepo();
    try {
        await store.set(request.payload);
        sendResponse({ success: true });
    } catch(e) {
        sendResponse({ success: false, message: "Someting went wrong" })
    }
}