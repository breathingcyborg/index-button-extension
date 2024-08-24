import { toast } from "sonner";
import { AddSitePopup } from "./add-site-popup";
import { getErrorMessage } from "@src/lib/utils/get-error-message";
import { useIndexButtonSettingsContext } from "./index-button-settings-context";
import { useState } from "react";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";

export function Sites() {
    const { removeSite, settings } = useIndexButtonSettingsContext();
    const sites = settings?.sites || [];
    const [showAddPopup, setShowAddPopup] = useState(false);

    const deleteSite = async (site: string) => {
        try {
            await removeSite(site);
            toast.success("Site Removed")
        } catch(e) {
            toast.error(getErrorMessage(e));
        }
    }

    return <div>
        <AddSitePopup open={showAddPopup} setOpen={setShowAddPopup} />
        {
            sites.length <= 0 && (
                <p className="text-lg">
                    No Sites Selected.
                </p>
            )
        }
        <ul>
            {
                sites.map(site => (
                    <li className="flex items-center max-w-full gap-2">
                        <div className="flex-1 min-w-0">
                            <div className="py-4 overflow-auto invisible-scrollbar pr-2 max-w-full">
                                {site}
                            </div>
                        </div>
                        <Button
                            className="flex-none" 
                            size={'icon'}
                            variant={'destructive'}
                            onClick={() => {
                                deleteSite(site);
                            }}
                        >
                            <TrashIcon />
                        </Button>
                    </li>
                ))
            }
        </ul>
        <Button
            onClick={() => setShowAddPopup(true)}
            className="w-full mt-4">
            Add Site
        </Button>
    </div>
}
