import { useEffect, useState } from "react"
import { useLiveQuery } from 'dexie-react-hooks';
import { countPages, Page, PageStatus, searchPages } from "@src/lib/bulk-indexing/pages-repo";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Button } from "@src/components/ui/button";
import { Alert, AlertDescription } from "@src/components/ui/alert";
import { AlertCircle, CheckCircle2Icon, CircleXIcon, LoaderIcon } from "lucide-react";

const statusOptions: { value: PageStatus, label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'error', label: 'Error' },
]

const perPage = 20;

export function PagesList({
    intro
} : {
    intro?: React.ReactElement
}) {

    const [limit, setLimit] = useState(perPage);
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState<PageStatus | null>(null);

    const count = useLiveQuery(() => {
        return countPages({
            limit,
            status: status || undefined,
            search: searchTerm || undefined
        })
    }, [limit, searchTerm, status]);

    const pages = useLiveQuery(() => {
        return searchPages({
            limit,
            status: status || undefined,
            search: searchTerm || undefined
        })
    }, [limit, searchTerm, status]);

    // reset limit
    useEffect(() => {
        setLimit(perPage);
    }, [searchTerm, status]);

    const hasMore = count !== undefined && count > limit;
    const noData = !searchTerm && !status && (pages || []).length <= 0;

    if (noData) {
        return intro;
    }

    return <div>
        <div className="flex justify-between">
            <Input
                placeholder="Search URL"
                className="max-w-96"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <StatusFilter value={status} onChange={setStatus} />
        </div>

        <ul className="divide-y-[0.5px] divide-white/30">
            {
                (pages || []).map((page) => (
                    <PageListItem key={page.id} page={page} />
                ))
            }
        </ul>

        {
            hasMore && <div className="flex justify-center">
                <Button variant='outline' onClick={() => setLimit(l => l + perPage)}>
                    Load More
                </Button>
            </div>
        }
    </div>
}

function StatusFilter({
    value,
    onChange
}: {
    value: PageStatus | null,
    onChange: (status: PageStatus | null) => void
}) {
    return <Select
        value={value || ''}
        onValueChange={(value) => {
            onChange(value ? value as PageStatus : null);
        }}
    >
        <SelectTrigger
            className="w-[180px]"
        >
            <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
            {
                statusOptions.map(({ value, label }) => (
                    <SelectItem value={value}>{label}</SelectItem>
                ))
            }
        </SelectContent>
    </Select>
}

function PageListItem({ page }: { page: Page }) {
    const { status, url, error_message } = page;

    return <li className="text-lg flex max-w-full gap-4 px-3">
        <div className="flex-grow flex-shrink min-w-0">
            <div className="overflow-auto py-5 invisible-scrollbar pr-5 max-w-full">
                <div>
                    {url}
                </div>
                {
                    status !== 'submitted' && error_message && <Alert className="mt-4" variant='destructive'>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {error_message}
                        </AlertDescription>
                    </Alert>
                }
            </div>
        </div>
        <div className="py-5 flex-grow-0 flex-shrink-0 flex items-center">
            {(status === 'pending') && (
                <span className="w-8 h-8">
                </span>
            )}
            {(status === 'processing') && (
                <LoaderIcon className="w-8 h-8 text-blue-600  animate-spin" />
            )}
            {(status === 'submitted') && (
                <CheckCircle2Icon className="w-8 h-8 text-green-500" />
            )}
            {(status === 'error') && (
                <CircleXIcon className="w-8 h-8 text-red-500" />
            )}
        </div>
    </li>
}