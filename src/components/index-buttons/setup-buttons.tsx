import { Button } from "@src/components/ui/button";
import { SettingsIcon } from "lucide-react";
import type { CreateTabRequest } from "@src/background-message-handlers";

export function SetupButtons() {
    const navigateToSetupPage = async () => {
        await chrome.runtime.sendMessage({
            type: 'createTab',
            payload: { 
                url: 'src/pages/setup/index.html', 
                active: true 
            }
        } satisfies CreateTabRequest);
    }

    return (
        <Button variant='ghost' className="py-4" onClick={navigateToSetupPage}>
            <SettingsIcon className="h-4 w-4 mr-2" /> 
            Add Keys
        </Button>
    )
}
