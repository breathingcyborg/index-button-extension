import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@src/components/ui/dialog";
import { AddPagesForm } from "./add-pages-form";
import { useEffect, useState } from "react";

export function AddPagesModal({
    open,
    onClose,
}: {
    open: boolean,
    onClose: () => void,
}) {

    // key helps reset state of AddPagesForm
    // when modal is opened / closed
    const [key, setKey] = useState(1);

    useEffect(() => {
        setKey(k => k+1);
    }, [open]);

    return <Dialog
        open={open}
        onOpenChange={(open) => {
            if (!open) {
                onClose();
            }
        }}
    >
        <DialogContent className="max-w-[800px]">
            <DialogHeader>
                <DialogTitle>Add Pages</DialogTitle>
                <DialogDescription>
                    Add pages to submit to google for indexing
                </DialogDescription>
            </DialogHeader>
            <AddPagesForm key={key} onSuccess={onClose} />
        </DialogContent>
    </Dialog>
}