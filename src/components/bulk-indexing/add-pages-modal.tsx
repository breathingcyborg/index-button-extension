import { Alert, AlertDescription } from "@src/components/ui/alert";
import { Button } from "@src/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@src/components/ui/dialog";
import { Label } from "@src/components/ui/label";
import { Textarea } from "@src/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { parseUrls } from '../../pages/bulk/utils';
import { BulkIndexPagesRequest } from "@src/background-message-handlers";

export function AddPagesModal({
    open,
    onClose,
}: {
    open: boolean,
    onClose: () => void,
}) {
    const [urlsText, setUrlsText] = useState('');
    const [error, setError] = useState<unknown>(null);
    const [submitting, setSubmitting] = useState(false);

    const submitPages: React.FormEventHandler = async (e) => {

        e.preventDefault();
        e.stopPropagation();

        try {

            setSubmitting(true);
            const urls = parseUrls(urlsText);

            await chrome.runtime.sendMessage({
                type: 'bulkIndexPages',
                payload: {
                    urls: urls
                }
            } satisfies BulkIndexPagesRequest);

            toast.success("Pages queued for indexing");

            onClose();

        } catch (e) {

            setError(e);

        } finally {

            setSubmitting(false);

        }
    }

    return <Dialog
        open={open}
        onOpenChange={(open) => {
            if (!open) {
                onClose();
            }
        }}
    >
        <DialogContent className="max-w-[800px]">
            <DialogHeader>
                <DialogTitle>Add Pages</DialogTitle>
                <DialogDescription>
                    Add pages to submit to google for indexing
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitPages}>

                <div className="flex flex-col gap-4">
                    <Label htmlFor="urls" className="text-base">
                        Page Urls*
                    </Label>
                    <Textarea rows={20} value={urlsText} onChange={(e) => setUrlsText(e.target.value)} />
                    <div className="text-foreground/50 text-lg">
                        Enter urls of the pages you want to submit for google indexing <br />
                        One url per line.
                    </div>
                </div>
                {
                    !!error && (
                        <div>
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    {(error as Error)?.message}
                                </AlertDescription>
                            </Alert>
                        </div>
                    )
                }
                <div className="mt-4">
                    <Button
                        disabled={!urlsText || submitting}
                        type="submit"
                        size='lg'
                    >
                        Submit For Indexing
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
}