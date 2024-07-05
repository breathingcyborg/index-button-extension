export type MessageRequest = {
    type: string,
    payload?: any
}

export type MessageHandler<T extends MessageRequest = any, R = any> = (
    request : T, 
    sender: chrome.runtime.MessageSender, 
    sendResponse: (response?: R) => void
) => void | Promise<void>


export type StatusResponse = {
    success: boolean;
    message?: string;
}