import { useEffect, useState } from "react"
import * as sitemapPagesRepo from '../../lib/bulk-indexing/sitemap-pages-repo';
import { useLiveQuery } from "dexie-react-hooks";
import { SitemapPage } from "../../lib/bulk-indexing/sitemap-pages-repo";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { BulkIndexPagesRequest } from "@src/background-message-handlers";
import { toast } from "sonner";

const PER_PAGE = 25;

export function SitemapUrlsSelector({ onDone } : { onDone: () => void | Promise<void> }) {
    // search query
    const [q, setQ] = useState('');

    // page number
    const [pageNumber, setPageNumber] = useState(1);

    // goto first page when search term changes
    useEffect(() => {
        setPageNumber(1);
    }, [q]);

    // urls in sitemap
    const urls = useLiveQuery(() => {
        return sitemapPagesRepo.searchPages({ 
            limit: PER_PAGE, 
            search: q,
            offset: (pageNumber - 1) * PER_PAGE
        })
    }, [q, pageNumber]);

    // number of pages
    const count = useLiveQuery(() => {
        return sitemapPagesRepo.countPages({
            search: q,
        })
    }, [q]);

    // number of selected pages
    const selectedCount = useLiveQuery(() => {
        return sitemapPagesRepo.countSelectedPages({  });
    }, []);


    const numberOfPages = Math.ceil((count || 0) / PER_PAGE);

    const hasPrev = pageNumber > 1;
    const hasNext = numberOfPages > pageNumber;

    const pageItemsCount = (urls || []).length;
    const pageSelectedItemsCount = (urls || []).filter(u => u.selected === 1).length;
    const checkboxState = pageSelectedItemsCount === 0
        ? false
        : pageSelectedItemsCount === pageItemsCount
            ? true
            : "indeterminate";

    const goNext = () => {
        if (!hasNext) {
            return;
        }
        setPageNumber(p => p+1);
    }

    const goPrev = () => {
        if (!hasPrev) {
            return;
        }
        setPageNumber(p => p-1);
    }

    const togglePageSelection = async (page: SitemapPage) => {
        if (page.id === undefined) {
            return;
        }
        page.selected 
            ?   sitemapPagesRepo.deselectPages({ ids: [ page.id ] })
            : sitemapPagesRepo.selectPages({ ids: [ page.id ] })
    }

    const toggleCurrentPageCheckbox = async () => {
        const ids = (urls || []).map(u => u.id).filter(id => id !== undefined) as number[];

        if (checkboxState === true) {
            await sitemapPagesRepo.deselectPages({ ids });
            return
        }

        await sitemapPagesRepo.selectPages({ ids })
    }

    const handleSelectAll = async () => {
        await sitemapPagesRepo.selectAllPages({ search: q });
    }

    const handleClearAll = async () => {
        await sitemapPagesRepo.deselectAllPages({ search: q });
    }

    const handleDone = async () => {
        const selected = await sitemapPagesRepo.getSelectedPages();
        const urls = selected.map(s => s.url);
        
        await chrome.runtime.sendMessage({
            type: 'bulkIndexPages',
            payload: {
                urls: urls
            }
        } satisfies BulkIndexPagesRequest);

        toast.success("Pages queued for indexing");

        await onDone();
    }

    return <div>
        <div className="flex justify-between py-4 px-3 items-center">
            <div>
                <Checkbox
                    checked={checkboxState}
                    onCheckedChange={toggleCurrentPageCheckbox}
                />
            </div>
            <div>
                <Input
                    placeholder="Search" 
                    value={q} 
                    onChange={(e) => {
                        setQ(e.target.value);
                    }}
                />
            </div>
        </div>
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            {/* select checkbox (toggles selection state for urls in this page) */} {/* search box */}
            <ul className="divide-y-[0.5px] divide-white/30">
                {
                    (urls || []).map((url) => (
                        <PageListItem 
                            key={url.id} 
                            page={url} 
                            onToggle={togglePageSelection}
                        />
                    ))
                }
            </ul>
        </div>
        <div className="flex justify-between px-3 py-4">
            <div className="flex flex-row items-center gap-2">
                <div className="flex gap-4">
                    <Button variant={"outline"} onClick={handleSelectAll}>
                        Select All
                    </Button>
                    <Button variant={"outline"} onClick={handleClearAll}>
                        Clear All
                    </Button>
                </div>
                <p>
                    { selectedCount } of { count } selected
                </p>
            </div>
            <div>
                <div className="flex gap-2">
                    <Button size='icon' disabled={!hasPrev} variant={'outline'} onClick={goPrev}>
                        <ChevronLeftIcon />
                    </Button>
                    <Button size='sm' variant={'outline'} disabled>
                        Page { pageNumber } of { numberOfPages }
                    </Button>
                    <Button size='icon' disabled={!hasNext} variant={'outline'} onClick={goNext}>
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
        </div>
        <div className="px-3 text-right">
            <Button size={'lg'} onClick={handleDone}>
                Submit Selected Pages
            </Button>
        </div>
    </div>
}

function PageListItem({ page, onToggle }: { page: SitemapPage, onToggle: (page: SitemapPage) => void | Promise<void> }) {
    const { selected, url } = page;

    return <li className="group text-lg flex max-w-full gap-4 px-3">
        <div className="py-5 flex-grow-0 flex-shrink-0 flex items-center gap-2">
            <Checkbox
                value={''}
                checked={selected === 1 ? true : false}
                onCheckedChange={() => {
                    onToggle(page);
                }}
            />
        </div>
        <div className="flex-grow flex-shrink min-w-0">
            <div className="overflow-auto py-5 invisible-scrollbar pr-5 max-w-full">
                <div>
                    {url}
                </div>
            </div>
        </div>
    </li>
}

