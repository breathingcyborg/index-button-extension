import { buttonVariants } from "@src/components/ui/button";
import { cn } from "@src/lib/utils/cn";
import { YoutubeIcon } from "lucide-react";
import codeIcon from '@assets/img/icons/undraw_code_typing_re_p8b9.svg';

export function Intro() {
    return <div>
        <h1 className="text-center text-3xl">
            Get your pages indexed <br />
            With google in 24 hours
        </h1>
        <div className="mt-4 text-center">
            <img src={codeIcon} />
        </div>
        <p className='text-xl text-center text-foreground/50 mt-4 inline-block'>
            Create a google service account key, that lets you submit pages for indexing
        </p>
        <div className="mt-4">
            <a className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'w-full gap-2')}>
                <YoutubeIcon /> Watch Tutorial
            </a>
        </div>
    </div>
}