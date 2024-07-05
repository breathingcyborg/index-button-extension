import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ServiceAccountRequestQuotaStore } from '../service-account';
import { AccesssTokenHelper } from './access-token-helper';
import { DAILY_QUOTA, INDEXING_API_URL } from './constants';
import { getFirstError, isGoogleApiError } from './google-api-error';
import { getCredsWithUnusedQuota } from './get-creds-with-unused-quota';

const client = axios.create({
    baseURL: INDEXING_API_URL
});

export const request = async<T>(config: AxiosRequestConfig) : Promise<AxiosResponse<T, any>> => {

    // create services
    const tokenHelper = new AccesssTokenHelper();
    const quotaStore = new ServiceAccountRequestQuotaStore();

    // find credentials with unused quota
    const cred = await getCredsWithUnusedQuota();
    if (cred === null) {
        throw new Error('no service account credential with unused quota');
    }

    // attach access token
    const accessToken = await tokenHelper.getAccessToken(cred);
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${accessToken}`;

    // update quota
    await quotaStore.incrementQuota(cred);

    try {

        // response
        const response = await client<T>(config);

        // success
        return response;

    } catch(e) {

        if (!(e instanceof AxiosError)) {
            return Promise.reject(e);
        }

        const isResponseError = e.response;
        if (!isResponseError) {
            return Promise.reject(e);
        }

        const response = e.response?.data || {};
        if (!isGoogleApiError(response)) {
            return Promise.reject(e);
        }

        const error = getFirstError(response);
        if (error === null) {
            return Promise.reject(e);
        }

        // daily quota reached
        const reason = error.reason;
        if (reason === 'dailyLimitExceeded') {

            // inform quota store
            await quotaStore.setQuota(cred, DAILY_QUOTA);

            // retry if there are service account credentials with unused quota
            const availableCreds = await getCredsWithUnusedQuota();
            if (availableCreds !== null) {
                return request(config);
            }
        }

        return Promise.reject(new Error(`Google Api Error: ${error.message}`));
    }
}