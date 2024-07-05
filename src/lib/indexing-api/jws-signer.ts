import { ServiceAccountCreds } from "../service-account";
import { KJUR } from 'jsrsasign';
import { GOOGLE_OAUTH_URL } from "./constants";


export class JWTSigner {

    async createSignedJWT(creds: ServiceAccountCreds) {
        const scopes = [
            'https://www.googleapis.com/auth/indexing'
        ];
    
        const header = {
            type: "JWT",
            alg: "RS256"
        }
    
        const iat = Math.floor(new Date().getTime() / 1000);
        const exp = iat + 3600; // 1 hour
        const headerStr = JSON.stringify(header);
        const payload = {
            aud: GOOGLE_OAUTH_URL,
            iss: creds.client_email,
            scope: scopes.join(" "),
            iat: iat,
            exp: exp,
        }
        const payloadStr = JSON.stringify(payload);
    
        // https://gist.github.com/dinvlad/425a072c8d23c1895e9d345b67909af0#file-pre_request-js-L81
        const token = KJUR.jws.JWS.sign(null, headerStr, payloadStr, creds.private_key);
        return token;
    }
}
