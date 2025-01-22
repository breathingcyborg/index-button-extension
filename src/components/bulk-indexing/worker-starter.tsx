import { StartWorkerRequest } from "@src/background-message-handlers";
import { useEffect } from "react";

/** start worker */
const start = async () => {
    await chrome.runtime.sendMessage({
        type: 'startWorker',
        payload: null,
    } as StartWorkerRequest);
}

const INTERVAL_MS = 10 * 1000;

export function WorkerStarter() {

    useEffect(() => {
        const intervalId = setInterval(start, INTERVAL_MS);
        return () => clearInterval(intervalId)
    }, []);

    return null;
}