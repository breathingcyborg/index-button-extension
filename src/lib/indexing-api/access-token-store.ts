import { ServiceAccountCreds, getServiceAccountCredsId } from "../service-account";

// 1 hour in milliseconds
const TOKEN_VALIDATY_MS = 1 * 60 * 60 * 60;

export class AccessTokenStore {
   
    async getToken(creds: ServiceAccountCreds) {
        const key = this.getStoragekey(creds);
        const result = await chrome.storage.local.get(key);
        if (!result || !result[key]) {
            return null;
        }

        const { token, createdAt } = result;

        const nowTimestamp = new Date().getTime();
        const expiryTimestamp = createdAt + TOKEN_VALIDATY_MS;
        if (nowTimestamp >= expiryTimestamp) {
            return null;
        }

        return token;
    }

    async removeToken(creds: ServiceAccountCreds) {
        const key = this.getStoragekey(creds);
        await chrome.storage.local.remove(key);        
    }

    async setToken(creds: ServiceAccountCreds, token: string) {
        const key = this.getStoragekey(creds);
        const createdAt = new Date().getTime();
        const value = { [key]: { token, createdAt } }
        await chrome.storage.local.set(value);
    }

    private getStoragekey(creds: ServiceAccountCreds) {
        const credsId = getServiceAccountCredsId(creds);
        return `access_token:${credsId}`;
    }
}