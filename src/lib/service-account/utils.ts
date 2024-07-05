import { ServiceAccountCreds } from "./types";

export function getServiceAccountCredsId(creds: ServiceAccountCreds) {
    return `${creds.project_id}:${creds.private_key_id}`;
}