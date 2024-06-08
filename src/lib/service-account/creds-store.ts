import { ServiceAccounCreds } from "./types";

const STORAGE_KEY = 'service_account_creds'

export class ServiceAccountCredsStorage {

    async insert(creds: ServiceAccounCreds) {
        const credsList = await this.getAll();
        credsList.push(creds);
        await this.persist(credsList);
    }
 
    async delete(index: number) {
        const creds = await this.getAll();
        if (creds.length < index + 1) {
            return
        }
        creds.splice(index, 1);
        await this.persist(creds);
    }

    async getAll() {
        const result = await chrome.storage.local.get(STORAGE_KEY);
        return (result[STORAGE_KEY] as ServiceAccounCreds[] || [])
    }

    private async persist(creds: ServiceAccounCreds[]) {
        await chrome.storage.local.set({ [STORAGE_KEY]: creds });
    }
}