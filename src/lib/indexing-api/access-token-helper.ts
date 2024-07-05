import axios, { Axios } from "axios";
import { ServiceAccountCreds } from "../service-account";
import { AccessTokenStore } from "./access-token-store";
import { JWTSigner } from "./jws-signer";
import { GOOGLE_OAUTH_URL } from "./constants";

type AccessTokenResponse = {
    access_token: string
}

export class AccesssTokenHelper {

    private store : AccessTokenStore;
    private signer : JWTSigner;
    private httpClient : Axios;

    constructor() {
        this.store = new AccessTokenStore();
        this.signer = new JWTSigner();
        this.httpClient = axios.create();
    }

    async getAccessToken(creds: ServiceAccountCreds) {
        let token = await this.store.getToken(creds);
        if (token == null) {
            token = await this.fetchAccessToken(creds);
            await this.store.setToken(creds, token);
        }
        return token;
    }

    async fetchAccessToken(creds: ServiceAccountCreds) {
        const signedJWT = await this.signer.createSignedJWT(creds);
        
        const params = new URLSearchParams({
            'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion': signedJWT,
        });
        
        const { data } = await this.httpClient.post<AccessTokenResponse>(GOOGLE_OAUTH_URL, params);
        return data.access_token;
    }   
}