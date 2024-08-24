import { StatusResponse } from "@src/background-message-handlers"
import { GetButtonSettingsRequest } from "@src/background-message-handlers/button-settings/get-button-settings"
import { SetButtonSettingsRequest } from "@src/background-message-handlers/button-settings/set-button-settings"
import { ButtonSettings } from "@src/lib/button-settings/button-settings-repo"
import { createContext, useContext, useEffect, useState } from "react"

export type IndexButtonSettingsContextValue = {
    loading: boolean,
    settings: ButtonSettings | null,
    addSite: (site: string) => Promise<StatusResponse>,
    removeSite: (site: string) => Promise<StatusResponse>,
    setShowOnAllSites: (show: boolean) => Promise<StatusResponse>,
}

const defaultStatusResponse : StatusResponse = { success: false, message: 'Missing Context Provider' }

const defaultValue : IndexButtonSettingsContextValue = {
    settings: null,
    loading: true,
    addSite: async (site: string) => defaultStatusResponse,
    removeSite: async (site: string) => defaultStatusResponse,
    setShowOnAllSites: async (show: boolean) => defaultStatusResponse,
}

const IndexButtonSettingsContext = createContext<IndexButtonSettingsContextValue>(defaultValue)

const notloadedError = new Error('settings not loaded')

export const IndexButtonSettingsContextProvider = ({
    children 
}: { 
    children: React.ReactNode
}) => {

    const [loading, setLoading] = useState(false);

    const [settings, setSettings] = useState<ButtonSettings | null>(null);

    useEffect(() => {

        const load = async () => {
            setLoading(true);
            const response : ButtonSettings = await chrome.runtime.sendMessage({
                type: 'getButtonSettings'
            } satisfies GetButtonSettingsRequest)
            setSettings(response);
            setLoading(false);
        }

        load();

    }, []);

    const updateSettings = async (newSettings: ButtonSettings) => {
        const request : SetButtonSettingsRequest = {
            type: 'setButtonSettings',
            payload: newSettings,
        }

        const response : StatusResponse = await chrome.runtime.sendMessage(request);

        if (response.success) {
            setSettings(newSettings);
        }

        return response;
    }

    const addSite = async (site: string) => {
        if (settings === null) {
            throw notloadedError;
        }
        const newSettings : ButtonSettings = {
            ...settings,
            sites: [ ...settings.sites, site ],
        }
        return updateSettings(newSettings);
    }

    const removeSite = async (site: string) => {
        if (settings === null) {
            throw notloadedError;
        }
        const newSettings : ButtonSettings = {
            ...settings,
            sites: settings.sites.filter(s => s !== site)
        }
        return updateSettings(newSettings);
    }

    const setShowOnAllSites = async (show: boolean) => {
        if (settings === null) {
            throw notloadedError;
        }
        const newSettings : ButtonSettings = {
            ...settings,
            showOnAllSites: show,
        }
        return updateSettings(newSettings);
    }

    const value : IndexButtonSettingsContextValue = {
        loading,
        settings,
        addSite,
        removeSite,
        setShowOnAllSites,
    }

    return <IndexButtonSettingsContext.Provider value={value}>
        { children }
    </IndexButtonSettingsContext.Provider>
}

export const useIndexButtonSettingsContext = () => useContext(IndexButtonSettingsContext); 