import { ServiceAccountCredsStorage, ServiceAccountRequestQuotaStore } from "../service-account";
import { DAILY_QUOTA } from "./constants";

export async function getCredsWithUnusedQuota() {
    const credsStore = new ServiceAccountCredsStorage();
    const creds = await credsStore.getAll();
    const quotaStore = new ServiceAccountRequestQuotaStore();
    for (let cred of creds) {
        const usedQuota = await quotaStore.getQuota(cred);
        if (usedQuota < DAILY_QUOTA) {
            return cred;
        }
    }
    return null;
}
