import type { CreateTabRequest, IndexPageRequest, StatusResponse } from "@src/background-message-handlers";
import { useEffect, useState } from "react";
import { Button } from "@src/components/ui/button";
import { CheckCircle2, CloudUploadIcon, Layers3Icon, LoaderIcon, SettingsIcon } from "lucide-react";
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
        <Button variant='ghost' onClick={indexSingle}>
            {
                submitting && (
                    <LoaderIcon className="animate-spin" />
                )
            }
            {
                !submitting && success && (
                    <CheckCircle2 color="green" />
                )
            }
            {
                !submitting && !success && (
                    <CloudUploadIcon />
                )
            }
        </Button>
        <Button variant='ghost' onClick={navigateToBulkIndexPage}>
            <Layers3Icon />
        </Button>
        <Button variant='ghost' onClick={navigateToSettingsPage}>
            <SettingsIcon />
        </Button>
    </>
}