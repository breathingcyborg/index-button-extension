import type { CreateTabRequest, IndexPageRequest, StatusResponse } from "@src/background-message-handlers";
import { useEffect, useState } from "react";
import { Button } from "@src/components/ui/button";
import { CheckCircle2, CloudUploadIcon, FilesIcon, Layers3Icon, LoaderIcon, SettingsIcon } from "lucide-react";
import { getCurrentUrl } from "@src/lib/utils/get-current-url";
import { showError } from "./utils";

export function IndexingButtons() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // hide success after x seconds
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(false)   
            }, 2000)
        }
    }, [success, setSuccess]);

    const navigateToBulkIndexPage = async () => {
        await chrome.runtime.sendMessage({
            type: 'createTab',
            payload: { 
                url: 'src/pages/bulk/index.html', 
                active: true 
            }
        } satisfies CreateTabRequest);
    }

    const navigateToSettingsPage = async () => {
        await chrome.runtime.sendMessage({
            type: 'createTab',
            payload: { 
                url: 'src/pages/settings/index.html', 
                active: true 
            }
        } satisfies CreateTabRequest);
    }

    const indexSingle = async () => {

        // wait for success animation to finish
        if (success) {
            return;
        }

        // get current page url
        let url : string | null = null;
        try {
            url = await getCurrentUrl();
        } catch(e) {
            showError(e);
            return
        }

        // submit for indexing
        setSubmitting(true);
        const response : StatusResponse = await chrome.runtime.sendMessage({
            type: 'indexPage',
            payload: { 
                url: url!
            }
        } satisfies IndexPageRequest);
        setSubmitting(false);

        // show error
        if (!response.success) {
            showError(response?.message)
            return;
        }

        setSuccess(true);
    }

    return <>        
        <Button 
            className="rounded-l-full rounded-r-none bg-background translate-x-2 relative z-0" 
            variant='ghost'
            size='defaultNoBorder'
            onClick={navigateToBulkIndexPage}
            title="Bulk Index"
        >
            <FilesIcon />
        </Button>
        <Button
            className="rounded-full h-auto px-4 py-4 text-lg relative z-10 hover:bg-primary-light"
            variant='default'
            title="Index This Page"
            onClick={indexSingle}>
            {
                submitting && (
                    <LoaderIcon className="animate-spin" />
                )
            }
            {
                !submitting && success && (
                    <CheckCircle2 />
                )
            }
            {
                !submitting && !success && (
                    <CloudUploadIcon />
                )
            }
        </Button>
        <Button 
            className="rounded-r-full rounded-l-none bg-background -translate-x-2 relative z-0"  
            variant='ghost' 
            size='defaultNoBorder'
            title="Settings"
            onClick={navigateToSettingsPage}
        >
            <SettingsIcon />
        </Button>
    </>
}