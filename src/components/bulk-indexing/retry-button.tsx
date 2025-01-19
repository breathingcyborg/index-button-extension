import { IndexPageRequest, StatusResponse } from "@src/background-message-handlers";
import { Page } from "@src/lib/bulk-indexing/pages-repo";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LoaderIcon, RefreshCcw } from "lucide-react";

export function RetryButton({ page } : { page: Page }) {
    const [retrying, setRetrying] = useState(false);

    const onClick = async () => {
        try {
            setRetrying(true);

            const response : StatusResponse = await chrome.runtime.sendMessage({
                type: 'indexPage',
                payload: { pageId: page.id }
            } as IndexPageRequest)

            if (response.success) {
                toast.success("Page submitted");
            }

            if (!response.success) {
                toast.error(response.message || 'Something went wrong');
            }

        } finally {

            setRetrying(false);

        }
    }

    return <Button 
        onClick={onClick}
        className="hidden group-hover:inline-flex" 
        variant='default' 
        size={'icon'}
    >
        {
            retrying ? (
                <LoaderIcon className="animate-spin"/>
            ) : (
                <RefreshCcw />
            )
        }
    </Button>
}