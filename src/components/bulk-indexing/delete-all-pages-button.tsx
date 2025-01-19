import { StatusResponse } from "@src/background-message-handlers";
import { DeleteAllPagesRequest } from "@src/background-message-handlers/indexing/delete-all-pages";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useLiveQuery } from "dexie-react-hooks";
import { totalPagesCount } from "@src/lib/bulk-indexing/pages-repo";

export function DeleteAllPagesButton() {
    const [deleting, setDeleting] = useState(false);
    const count = useLiveQuery(() => totalPagesCount())

    const deleteAll = async () => {
        setDeleting(true);

        const response : StatusResponse = await chrome.runtime.sendMessage({
            type: 'deleteAllPages'
        } satisfies DeleteAllPagesRequest);
        
        if (!response.success) {
            toast.error(response.message);
        }

        setDeleting(false);
    }

    if (count === undefined || count <= 0) {
        return null;
    }

    return (
        <Button variant={"destructive"} disabled={deleting} onClick={deleteAll}>
            Delete All
        </Button>
    )
}