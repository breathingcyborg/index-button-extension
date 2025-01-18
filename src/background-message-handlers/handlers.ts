import { getButtonSettings } from './button-settings/get-button-settings';
import { setButtonSettings } from './button-settings/set-button-settings';
import { createTab } from './general';
import { indexPage, bulkIndexPages, startWorker } from './indexing';
import { addKey, getKeys, removeKey } from './keys';
import { MessageHandler } from './type';

export const handlers : Record<string, MessageHandler> = {
    createTab,
    indexPage,
    getKeys,
    removeKey,
    addKey,
    getButtonSettings,
    setButtonSettings,
    bulkIndexPages,
    startWorker,
}