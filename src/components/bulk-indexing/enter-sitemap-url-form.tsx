import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";

export function EnterSitemapUrlForm({
    onSubmit,
}: {
    onSubmit: (url: string) => void | Promise<void>
}) {
    const [error, setError] = useState<unknown>(false);
    const [sitemapURL, setSitemapUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handlSubmit = async () => {
        try {
            setSubmitting(true);
            setError(null);
            await onSubmit(sitemapURL);
        } catch (e) {
            setError(e);
        } finally {
            setSubmitting(false);
        }
    }

    return <div>
        <div className="flex flex-col gap-4">
            <Label htmlFor="sitemapUrl" className="text-base">
                Sitemap URL*
            </Label>
            <Input
                id="sitemapUrl"
                name="sitemapUrl"
                value={sitemapURL}
                onChange={(e) => setSitemapUrl(e.target.value)}
            />
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
        {
            submitting && <div className="mt-4 p-4 flex gap-4 items-center">
                <div>
                    <Loader2Icon className="animate-spin" />
                </div>
                <div className="flex flex-col gap-1">
                    <strong>Fetching Sitemap...</strong>
                    <p className="text-foreground/50" >This could take a few minutes</p>
                </div>
            </div>
        }
        <div className="mt-4">
            <Button
                disabled={!sitemapURL || submitting}
                size='lg'
                onClick={handlSubmit}
            >
                Submit
            </Button>
        </div>
    </div>
}
