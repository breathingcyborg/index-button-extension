import { handlers } from "@src/background-message-handlers";

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