import { useEffect } from "react";
import { Screen, usePopupContext } from "../context"
import { ServiceAccountCredsStorage } from "@src/lib/service-account/creds-store";

function useSetInitialScreen() {
    const { setScreen } = usePopupContext();

    useEffect(() => {
        let stale = false;
        async function init() {
            const store = new ServiceAccountCredsStorage();
            const creds = await store.getAll();
            if (stale) { 
                return
            }
            if (creds.length <= 0) {
                chrome.tabs.create({ url: 'src/pages/setup/index.html', active: true });
                return
            }
            setScreen(Screen.SingleIndex);
        }
        init();
        return () => { stale = true };
    }, []);
}

export function LoadingScreen() {
    useSetInitialScreen();
    return null;
}