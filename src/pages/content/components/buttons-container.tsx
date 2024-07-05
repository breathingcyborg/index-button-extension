import { cn } from "@src/lib/utils/cn";

export function ButtonsContainer({ className, children }: React.HtmlHTMLAttributes<HTMLDivElement>) {
    return <div className={cn("rounded-lg bg-background z-[999999] fixed bottom-8 left-[50vw] -translate-x-1/2", className)}>
        {children}
    </div>;
}
