import { cn } from "@src/lib/utils/cn";

export function ButtonsContainer({ className, children, inPopup }: React.HtmlHTMLAttributes<HTMLDivElement> & { inPopup?: boolean }) {
    return <div className={
        cn(
            "rounded-lg bg-background",
            {
                "z-[999999] fixed bottom-8 left-[50vw] -translate-x-1/2": !inPopup,
                "": inPopup
            },
            className
        )}
    >
        {children}
    </div>
}
