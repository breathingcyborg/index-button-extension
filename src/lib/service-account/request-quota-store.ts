import { ServiceAccountCreds } from "./types";
import { getServiceAccountCredsId } from "./utils";


/**
 * 
 * Each service account can only make few request in 24 hours.
 * This store helps store the number of requests made by service account for today.
 * 
 */
export class ServiceAccountRequestQuotaStore {

    async getQuota(creds: ServiceAccountCreds) {
        const storageKey = this.getStorageKey(creds);
        const dateString = this.getDateString(new Date());

        const result = await chrome.storage.local.get(storageKey);
        if (!result || !result[storageKey] || !result[storageKey][dateString]) {
            return 0;
        }

        const quota = parseInt(result[storageKey][dateString]);
        if (isNaN(quota)) {
            return 0;
        }
        return quota;
    }

    async setQuota(creds: ServiceAccountCreds, quota: number) {
        const storageKey = this.getStorageKey(creds);
        const dateString = this.getDateString(new Date());
        await chrome.storage.local.set({ [storageKey]: { [dateString]: quota }});
    }

    async incrementQuota(creds: ServiceAccountCreds) {
        const quota = await this.getQuota(creds);
        await this.setQuota(creds, quota + 1);
    }

    private getStorageKey(creds: ServiceAccountCreds) {
        const credsId = getServiceAccountCredsId(creds);
        return `quota:${credsId}`;
    }

    private getDateString(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    }
}

