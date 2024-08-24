import { MessageHandler } from "../type";
import { ButtonSettings, ButtonSettingsRepo } from "@src/lib/button-settings/button-settings-repo";

export type GetButtonSettingsRequest = {
    type: 'getButtonSettings',
    payload?: undefined
}

export const getButtonSettings : MessageHandler<GetButtonSettingsRequest, ButtonSettings> = async (
    request, sender, sendResponse
) => {
    const store = new ButtonSettingsRepo();
    const settings = await store.get();
    sendResponse(settings);
}