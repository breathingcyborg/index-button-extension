import { Button } from "@src/components/ui/button";
import { ScreenTitle } from "@src/components/ui/screen";
import { FilesIcon } from "lucide-react";
import { useState } from "react";
import { AddPagesModal } from "../../components/bulk-indexing/add-pages-modal";
import { PagesList } from "../../components/bulk-indexing/pages-list";
import { BulkAddIntro } from "@src/components/bulk-indexing/bulk-add-intro";
import { DeleteAllPagesButton } from "@src/components/bulk-indexing/delete-all-pages-button";

export function BulkPage() {
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    return <div className="container max-w-[1024px] py-8">
        <AddPagesModal
            open={addDialogOpen}
            onClose={() => setAddDialogOpen(false)}
        />
        <ScreenTitle className="flex justify-between">
            <div className="flex">
                <FilesIcon className="mr-3" />
                <div>
                    Bulk Index
                </div>
            </div>
            <div className="flex gap-2">
                <DeleteAllPagesButton />
                <Button onClick={() => setAddDialogOpen(true)} >Add Pages</Button>
            </div>
        </ScreenTitle>
        <div className='flex flex-col gap-2'>
            <PagesList
                intro={
                    <BulkAddIntro 
                        onAddClick={() => setAddDialogOpen(true)} 
                    />
                }
            />
        </div>
    </div>
}

