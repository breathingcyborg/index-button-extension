export function validateServiceAccountJson(json: any) {
    if (!json.project_id || typeof json.project_id != 'string') {
        throw new Error('invalid service account file: project_id missing or empty');
    }
    if (!json.private_key_id || typeof json.private_key_id != 'string') {
        throw new Error('invalid service account file: private_key_id missing or empty');
    }
    if (!json.private_key || typeof json.private_key != 'string') {
        throw new Error('invalid service account file: private_key missing or empty');
    }
    if (!json.client_email || typeof json.client_email != 'string') {
        throw new Error('invalid service account file: client_email missing or empty');
    }
}