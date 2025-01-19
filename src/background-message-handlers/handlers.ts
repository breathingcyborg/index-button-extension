import { getButtonSettings } from './button-settings/get-button-settings';
import { setButtonSettings } from './button-settings/set-button-settings';
import { createTab } from './general';
import { indexUrl, bulkIndexPages, startWorker, deleteAllPages, indexPage, deletePage } from './indexing';
import { addKey, getKeys, removeKey } from './keys';
import { MessageHandler } from './type';

export const handlers : Record<string, MessageHandler> = {
    createTab,
    indexUrl,
    getKeys,
    removeKey,
    addKey,
    getButtonSettings,
    setButtonSettings,
    bulkIndexPages,
    startWorker,
    deleteAllPages,
    deletePage,
    indexPage,
}