import { AlertCircle, AlertCircleIcon, CheckCircle2Icon, CircleXIcon, LoaderIcon } from "lucide-react";
import { BulkIndexStep, UrlState, UrlStatus, useBulkIndexContext } from "../context/bulk-index-context"
import { Alert, AlertDescription } from "@src/components/ui/alert";
import { Button } from "@src/components/ui/button";

export function Indexing() {
    const { step, urls, restart } = useBulkIndexContext();
    const done = step === BulkIndexStep.Done;

    return <div>
        <ul className="divide-y-[0.5px] divide-white/30">
            {
                urls.map((url, i) => (
                    <UrlRow state={url} />
                ))
            }
        </ul>
        {
            done && (
                <div className="mt-8">
                    <Button size={'lg'} onClick={() => restart()}>
                        Submit More Pages
                    </Button>
                </div>
            )
        }
    </div>
}

function UrlRow({ state } : {state: UrlState}) {
    const { status, url, errorMessage } = state;

    return <li className="text-lg flex max-w-full gap-4 px-3">
        <div className="flex-grow flex-shrink min-w-0">
            <div className="overflow-auto py-5 invisible-scrollbar pr-5 max-w-full">
                <div>
                    {url}
                </div>
                {
                    errorMessage && <Alert className="mt-4" variant='destructive'>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            { errorMessage }
                        </AlertDescription>     
                    </Alert>
                }
            </div>
        </div>
        <div className="py-5 flex-grow-0 flex-shrink-0 flex items-center">
            {(status === UrlStatus.Pending) && (
                <span className="w-8 h-8">
                </span>
            )}
            {(status === UrlStatus.Indexing) && (
                <LoaderIcon className="w-8 h-8 text-blue-600  animate-spin" />
            )}
            {(status === UrlStatus.Success) && (
                <CheckCircle2Icon className="w-8 h-8 text-green-500" />
            )}
            {(status === UrlStatus.Failed) && (
                <CircleXIcon className="w-8 h-8 text-red-500" />
            )}
        </div>
    </li>
}
