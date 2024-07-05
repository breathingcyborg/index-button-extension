import { ServiceAccountCreds, ServiceAccountCredsStorage } from "@src/lib/service-account";
import { MessageHandler } from "../type";

export type GetKeysRequest = {
    type: 'getKeys',
    payload?: undefined
}

export const getKeys : MessageHandler<GetKeysRequest, ServiceAccountCreds[]> = async (
    request, sender, sendResponse
) => {
    const store = new ServiceAccountCredsStorage();
    const keys = await store.getAll();
    sendResponse(keys);
}