import { useState } from "react";
import { useIndexButtonSettingsContext } from "./index-button-settings-context";
import { getErrorMessage } from "@src/lib/utils/get-error-message";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

export function AddSitePopup({
    open,
    setOpen,
}: {
    open: boolean,
    setOpen: (open: boolean) => void,
}) {
    const { addSite } = useIndexButtonSettingsContext();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState('');

    const handleFormSubmit : React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setError(null);

        try {
            const urlParsed = new URL(url)
            const protocol = urlParsed.protocol;
            if (!["http:", "https:"].includes(protocol)) {
                setError("only http and https url supported");
                return
            }
        } catch(e) {
            setError('invalid url');
            return
        }

        try {

            setSubmitting(true);
            const response = await addSite(url);
            if (!response.success) {
                setError(getErrorMessage(response.message));
                return;
            }

            setOpen(false);

            toast.success("Site Added")

        } catch(e) {

            setError(getErrorMessage(e));

        } finally {

            setSubmitting(false);

        }
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[400px]">
            <DialogHeader>
                <DialogTitle>
                    Add Site
                </DialogTitle>
                <DialogDescription>
                    Add site where you want to show indexing button.
                </DialogDescription>
            </DialogHeader>
            <form action="" onSubmit={handleFormSubmit}>
                <div className="py-4 flex flex-col gap-8">
                    {
                        error && (
                            <div className="bg-destructive p-2 rounded">
                                { error }
                            </div>
                        )
                    }
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">
                            Site URL
                        </Label>
                        <Input
                            id="url"
                            name="url"
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value)
                            }}
                            required
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={submitting}  type="submit">
                        {
                            submitting && <span className="mr-2">
                                <Loader2Icon className="w-4 h-4 animate-spin" />
                            </span>
                        }
                        Add Site
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
}