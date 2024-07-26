import { useState } from "react";
import { useBulkIndexContext } from "../context/bulk-index-context";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@src/components/ui/textarea";
import { Alert, AlertDescription } from "@src/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@src/components/ui/button";

export function InputUrls() {
    const { startIndexing } = useBulkIndexContext();
    const [urlsText, seturlsText] = useState('');
    const [errorMessage, setErrorMessage] = useState<string|null>(null);

    const handleSubmit : React.FormEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrorMessage(null)
        const urls = parseUrls(urlsText);
        
        if (urls.length <= 0) {
            setErrorMessage('Atleast 1 valid url is required');
            return
        }

        startIndexing(urls);
    }

    return <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            <div className="flex flex-col gap-4">
                <Label htmlFor="urls" className="text-lg">
                    Page Urls*
                </Label>
                <Textarea rows={20} value={urlsText} onChange={(e) => seturlsText(e.target.value)} />
                <div className="text-foreground/50 text-lg">
                    Enter urls of the pages you want to submit for google indexing <br/>
                    One url per line.
                </div>
            </div>
            {
                errorMessage && (
                    <div>
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                { errorMessage }
                            </AlertDescription>
                        </Alert>
                    </div>
                )
            }
            <div>
                <Button disabled={!urlsText} type="submit" size='lg'>
                    Submit For Indexing
                </Button>
            </div>
        </form>
    </div>
}

function parseUrls(text: string) {
    const urls = text.split("\n")
        .map(line => line.trim())
        .filter(line => {
            try {
                new URL(line);
                return true;
            } catch(e) {
                return false;
            }
        });
    return urls; 
}