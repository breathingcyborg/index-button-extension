export type ButtonSettings = {
    showOnAllSites: boolean
    sites: string[],
}

const STORAGE_KEY = 'button_settings';

export class ButtonSettingsRepo {

    async get() : Promise<ButtonSettings> {
        const result = await chrome.storage.local.get(STORAGE_KEY);
        if (!result || !result[STORAGE_KEY]) {
            return { sites: [], showOnAllSites: true }
        }
        return result[STORAGE_KEY] as ButtonSettings;
    }


    async set(settings: ButtonSettings) : Promise<void> {
        await this.persist(settings)
    }


    private async persist(settings: ButtonSettings) {
        await chrome.storage.local.set({ [STORAGE_KEY]: settings });
    }

}