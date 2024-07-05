import { handlers } from "@src/background-message-handlers";

console.log('background script loaded');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    (async() => {
        const type = request.type;
        if (type in handlers) {
            await handlers[type](request, sender, sendResponse)
        } else {
            sendResponse({ message: `no receiver for ${type}` });
        }
    })()
    return true;
});


// type MessageHandler = (request : any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void | Promise<void>

// const handlers : Record<string, MessageHandler> = {
//     'createTab': async (request: { payload: chrome.tabs.CreateProperties }, sender, sendResponse) => {
//         chrome.tabs.create(request.payload);
//         sendResponse({ success: true });
//     },
//     'indexPage': async (request: { payload: { url: string } }, sender, sendResponse) => {
//         const { url } = request.payload;
//         try {
//             await publish({
//                 type: PublishType.URL_UPDATED,
//                 url: url
//             })
//             sendResponse({ success: true })
//         } catch (e) {
//             console.log(`Indexing ${url} failed`);
//             console.log(e);
//             sendResponse({ success: false, message: (e as Error).message || 'Something went wrong' })
//         }
//     },
//     'getKeys':  async (request, sender, sendResponse) => {
//         const store = new ServiceAccountCredsStorage();
//         const keys = await store.getAll();
//         sendResponse(keys);
//     },
//     'removeKey':  async (request: { payload: { index: number } }, sender, sendResponse) => {
//         const { index } = request.payload;
//         const store = new ServiceAccountCredsStorage();
//         try {
//             await store.delete(index);
//             sendResponse({ success: true })
//         } catch(e) {
//             console.log(e);
//             sendResponse({ success: false, message: (e as Error).message })
//         }
//     },
//     'addKey':  async (request: { payload: { json: Object } }, sender, sendResponse) => {
//         const { json } = request.payload;
//         try {
//             validateServiceAccountJson(json);
//         } catch (e) {
//             sendResponse({ success: false, message: (e as Error).message });
//             return;
//         }
    
//         const store = new ServiceAccountCredsStorage();
//         try {
//             await store.insert(json as any);
//             sendResponse({ success: true })
//             return
//         } catch(e) {
//             console.log(e);
//             sendResponse({ success: false, message: (e as Error).message })
//             return
//         }
//     },
// }