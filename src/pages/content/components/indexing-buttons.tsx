import type { CreateTabRequest, IndexPageRequest, StatusResponse } from "@src/background-message-handlers";
import { useEffect, useState } from "react";
import { ButtonsContainer } from "./buttons-container";
import { Button } from "@src/components/ui/button";
import { CheckCircle2, CloudUploadIcon, Layers3Icon, LoaderIcon, SettingsIcon } from "lucide-react";
import { toast } from "sonner"

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
        const url = window.location.href;
        setSubmitting(true);
        const response : StatusResponse = await chrome.runtime.sendMessage({
            type: 'indexPage',
            payload: { 
                url: url
            }
        } satisfies IndexPageRequest);
        setSubmitting(false);
        if (!response.success) {
            toast.error(response.message || 'Something went wrong', {
                position: 'bottom-center',
                dismissible: true,
                closeButton: true,
                classNames: {
                    closeButton: 'group-[.toast]:bg-background group-[.toast]:hover:bg-background group-[.toast]:text-foreground'
                }
            });
            return;
        }
        setSuccess(true);
    }

    return <ButtonsContainer>
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
    </ButtonsContainer>
}
