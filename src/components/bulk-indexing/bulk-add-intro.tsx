import { Button, buttonVariants } from "@src/components/ui/button";
import { cn } from "@src/lib/utils/cn";
import { YoutubeIcon } from "lucide-react";
import codeIcon from '@assets/img/icons/undraw_code_typing_re_p8b9.svg';


export function BulkAddIntro({ onAddClick }: { onAddClick: () => void }) {
    return <div>
        <h1 className="text-center text-3xl">
            Add Pages In Bulk For Indexing
        </h1>
        <div className="mt-4 flex flex-col items-center gap-4">
            <img
                className="max-w-md" 
                src={codeIcon} 
            />
            <p className='max-w-sm text-xl text-center text-foreground/50 mt-4 inline-block'>
                You can add mutliple pages for indexing,
                indexing will continue in backgroud.
            </p>
            <Button size={'lg'} onClick={onAddClick}>
                Add Pages
            </Button>
        </div>
    </div>
}