export function getErrorMessage(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof (error as any)?.message === 'string') {
        return (error as any)?.message as string;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'Something went wrong';
}