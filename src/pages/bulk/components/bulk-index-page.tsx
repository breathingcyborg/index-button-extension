import { ScreenTitle } from "@src/components/ui/screen";
import { Layers3Icon } from "lucide-react";
import { BulkIndexStep, UrlStatus, useBulkIndexContext } from "../context/bulk-index-context";
import { InputUrls } from "./input-urls";
import { Indexing } from "./indexing";

export function BulkIndexPage() {
    const { step }  = useBulkIndexContext();
    return <div className="container max-w-[1024px] py-8">
        <PageHeader />
        <div className="px-3">
            {
                step === BulkIndexStep.InputUrls && (
                    <InputUrls />
                )
            }
            {
                [BulkIndexStep.Indexing, BulkIndexStep.Done].includes(step) && (
                    <Indexing />
                ) 
            }
        </div>
    </div>
}


function PageHeader() {

    const { step, urls }  = useBulkIndexContext();
    const totalUrls = urls.length;
    const processedUrls = urls.filter(u => {
        return (
            u.status !== UrlStatus.Pending && 
            u.status !== UrlStatus.Indexing
        )
    }).length;

    return <ScreenTitle className="flex justify-between">
        <div className="flex">
            <Layers3Icon className="mr-3" />
            <div>
                Bulk Index Pages
            </div>
        </div>
        {
            [BulkIndexStep.Indexing, BulkIndexStep.Done].includes(step) && (
                <div className="text-foreground/80 text-base font-normal">
                    {processedUrls} / {totalUrls} Urls Processed
                </div>
            )
        }
    </ScreenTitle>
}
