import { startWorker } from "./worker";

chrome.runtime.onStartup.addListener(() => {
    console.debug("onStartupListener");
    startWorker();
});

chrome.alarms.create("indexPages", {
    periodInMinutes: 5,
});

chrome.alarms.onAlarm.addListener((alarm) => {
    console.debug("onAlarm", new Date());
    if (alarm.name === 'indexPages') {
        console.debug("indexPages alarm", new Date());
        startWorker();
    }
});

self.addEventListener('online', () => {
    startWorker();
});

startWorker();