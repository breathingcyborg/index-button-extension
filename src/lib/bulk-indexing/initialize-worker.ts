import { startWorker } from "./worker";

chrome.runtime.onStartup.addListener(() => {
    startWorker();
});

chrome.alarms.create("indexPages", {
    periodInMinutes: 5,
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'indexPages') {
        startWorker();
    }
});

self.addEventListener('online', () => {
    startWorker();
});

startWorker();