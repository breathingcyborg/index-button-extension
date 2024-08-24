import { Loader2Icon } from "lucide-react";
import { useIndexButtonSettingsContext } from "./index-button-settings-context";

export function Loader({ children }: { children: React.ReactNode }) {
    const { loading, settings } = useIndexButtonSettingsContext();

    if (loading) {
        return <div className="flex justify-center">
            <Loader2Icon className="animate-spin" />
        </div>
    }

    if (!settings) {
        return <div>
            Could not fetch settings
        </div>
    }

    return children;
}