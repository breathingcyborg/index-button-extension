import { CircleCheckBigIcon } from "lucide-react";

export function SetupComplete() {
    return <div>
        <h1 className="text-center text-4xl">
            Setup Complete
        </h1>
        <div className="mt-4 flex justify-center text-green-500">
            <CircleCheckBigIcon size={100} />
        </div>
        <p className='text-xl text-center text-foreground/50 mt-4 inline-block'>
            Now, please visit the webpage you want to index to proceed with submitting it to google for indexing.
        </p>
    </div>
}