import { createTab } from './general';
import { indexPage } from './indexing';
import { addKey, getKeys, removeKey } from './keys';
import { MessageHandler } from './type';

export const handlers : Record<string, MessageHandler> = {
    createTab,
    indexPage,
    getKeys,
    removeKey,
    addKey,
}