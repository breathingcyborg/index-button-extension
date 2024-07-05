import type { CreateTabRequest, IndexPageRequest, StatusResponse } from "@src/background-message-handlers";
import { useState } from "react";
import { ButtonsContainer } from "./buttons-container";
import { Button } from "@src/components/ui/button";
import { CloudUploadIcon, Layers3Icon, LoaderIcon, SettingsIcon } from "lucide-react";

export function IndexingButtons() {
    const [submitting, setSubmitting] = useState(false);

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
            // TODO: display error some how
            console.log(response.message);
        }
    }

    return <ButtonsContainer>
        <Button variant='ghost' onClick={indexSingle}>
            {
                submitting ? (
                    <LoaderIcon className="animate-spin" />
                ) : (
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
