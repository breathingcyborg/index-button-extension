import { getErrorMessage } from "@src/lib/utils/get-error-message";
import { toast } from "sonner";

export function showError(error: unknown) {
    toast.error(getErrorMessage(error), {
        position: 'bottom-center',
        dismissible: true,
        closeButton: true,
        classNames: {
            closeButton: 'group-[.toast]:bg-background group-[.toast]:hover:bg-background group-[.toast]:text-foreground'
        }
    });
}