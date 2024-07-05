
export type GoogleApiError = {
    error: {
        code: number,
        message: string,
        errors: [
            {
                domain: string,
                reason: string,
                message: string,
            }
        ]
    }
}

export function isGoogleApiError(data : any) : data is GoogleApiError {
    if (!data || !data.error) {
        return false;
    }
    if (typeof data.error.code !== 'number') {
        return false;
    }
    if (typeof data.error.message !== 'string') {
        return false;
    }
    if (!data.error.errors || !Array.isArray(data.error.errors)) {
        return false;
    }
    if (data.error.errors.length <= 0) {
        return false;
    }
    const firstError = data.error.errors[0];
    if (typeof firstError.domain !== 'string') {
        return false;
    }
    if (typeof firstError.message !== 'string') {
        return false;
    }
    if (typeof firstError.reason !== 'string') {
        return false;
    }
    return true;
}

export function getFirstError(data: GoogleApiError) {
    if (data.error.errors.length <= 0) {
        return null;
    }
    return data.error.errors[0];
}

