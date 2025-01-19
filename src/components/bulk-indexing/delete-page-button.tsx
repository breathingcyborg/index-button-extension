import { DeletePageRequest, StatusResponse } from "@src/background-message-handlers";
import { Page } from "@src/lib/bulk-indexing/pages-repo";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LoaderIcon, Trash2Icon } from "lucide-react";

export function DeletePageButton({ page } : { page: Page }) {
    const [deleting, setDeleting] = useState(false);

    const onClick = async () => {
        try {
            setDeleting(true);

            const response : StatusResponse = await chrome.runtime.sendMessage({
                type: 'deletePage',
                payload: { pageId: page.id }
            } as DeletePageRequest)

            if (response.success) {
                toast.success("Page deleted");
            }

            if (!response.success) {
                toast.error(response.message || 'Something went wrong');
            }

        } finally {

            setDeleting(false);

        }
    }

    return <Button 
        onClick={onClick}
        className="hidden group-hover:inline-flex" 
        variant='destructive' 
        size={'icon'}
    >
        {
            deleting ? (
                <LoaderIcon className="animate-spin"/>
            ) : (
                <Trash2Icon />
            )
        }
    </Button>
}