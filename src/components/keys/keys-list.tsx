import { cn } from "@src/lib/utils/cn";
import { useKeys } from "./keys-context";
import { Button, buttonVariants } from "../ui/button";
import { DownloadIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import { ServiceAccountCreds } from "@src/lib/service-account";
import { downloadJson } from "@src/lib/utils/download-json";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export function KeysList() {
    const { keys, refetch, remove } = useKeys();
    const { pathname } = useLocation();

    useEffect(() => {
        refetch();
    }, [pathname])

    return <div>
        <ul className="flex flex-col gap-2 mb-8">
            {
                keys.map((k, i) => (
                    <li key={i}>
                        <KeyListItem index={i} creds={k}/>
                    </li>
                ))
            }
        </ul>
        <Link to='/keys/add' className={
            cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }), 
                "border w-full border-dashed"
            )}
        >
            <PlusIcon className="w-4 h-4 mr-2" /> Add New Key
        </Link>
    </div>
}

function KeyListItem({ creds, index } : { creds: ServiceAccountCreds, index: number }) {
    const { remove } = useKeys();

    const [deleting, setDeleting] = useState(false);

    const download = () => {
        downloadJson(creds, 'service-account.json')
    }

    const deleteKey = async () => {
        try {
            setDeleting(true)
            await remove(index)
        } finally {
            setDeleting(false);
        }
    }

    return <div className="px-4 py-2 rounded-lg border border-border flex items-center justify-between">
        <span className="text-base line-clamp-2" title={creds.client_email}>
            { creds.client_email } 
        </span>
        <div className="flex gap-1">
            <Button onClick={download} size='icon' variant='ghost'>
                <DownloadIcon />
            </Button>
            <Button onClick={deleteKey} variant='destructive' size='icon'>
                <TrashIcon />
            </Button>
        </div>
    </div>
}