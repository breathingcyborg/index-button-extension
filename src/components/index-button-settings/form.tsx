import { useState } from "react";
import { useIndexButtonSettingsContext } from "./index-button-settings-context";
import { getErrorMessage } from "@src/lib/utils/get-error-message";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Sites } from "./sites";

export function Form() {

    const { settings, setShowOnAllSites } = useIndexButtonSettingsContext();
    const [error, setError] = useState<string | null>(null);

    const onCheckedChange = async (checked: boolean) => {
        try {

            const response = await setShowOnAllSites(checked);
            if (!response.success) {
                setError(getErrorMessage(response.message))
            }

        } catch (e) {

            setError(getErrorMessage(e));

        }
    }

    return (
        <div className="flex flex-col gap-6">
            {
                error  && (
                    <div className="bg-destructive rounded p-2">
                        { error }
                    </div>
                )
            }
            <div className="flex justify-between items-center">
                <div>
                    <Label>
                        Show On All Sites
                    </Label>
                </div>
                <div>
                    <Switch
                        checked={settings!.showOnAllSites}
                        onCheckedChange={onCheckedChange}
                    />
                </div>
            </div>
            {
                !(settings?.showOnAllSites) && (
                    <div>
                        <Label>Sites</Label>
                        <p className="text-foreground/50 mt-2">
                            Sites where index button should be displayed.
                        </p>
                        <div className="mt-4">
                            <Sites />
                        </div>
                    </div>
                )
            }
        </div>
    )
}
