export function removeTrailingSlashes(s: string) {
    return s.replace(/(\/*)$/, '');
}