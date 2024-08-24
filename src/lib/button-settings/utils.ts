import { removeTrailingSlashes } from "../utils/remove-trailing-slashes";
import { ButtonSettings } from "./button-settings-repo";

export function shouldShowIndexingButton(settings: ButtonSettings, url: string) {
    let parsedURL : URL | null = null;

    try {
        parsedURL = new URL(url);
    } catch(e) {
        return false;
    }
    
    if (settings.showOnAllSites) {
        return true;
    }

    const allowedOrigins = settings.sites.map(removeTrailingSlashes);;
    const origin = parsedURL.origin;

    return allowedOrigins.includes(origin);
}