import { CircleCheckBigIcon } from "lucide-react";

export function Success() {
    return <div>
        <h1 className="text-center text-4xl">
           Success
        </h1>
        <div className="mt-4 flex justify-center text-green-500">
            <CircleCheckBigIcon size={100} />
        </div>
        <p className='text-xl text-center text-foreground/50 mt-4 inline-block'>
            Click on the extension icon in chrome bar to continue indexing.

        </p>
    </div>
}