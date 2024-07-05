import { cn } from "@src/lib/utils/cn"
import { Button, ButtonProps } from "./button"
import { MoveLeft } from "lucide-react"
import { useNavigate } from 'react-router-dom';

export function Screen({ children }: { children: React.ReactNode }) {
    return <div className="flex justify-center items-center w-screen h-screen">
        <div className="w-[400px] h-[600px] py-4 px-2">
            {children}
        </div>
    </div>
}

export function ScreenTitle({ className, children, ...props } : React.HTMLAttributes<HTMLHeadingElement>) {
    return <h1 className={cn("flex items-center px-3 text-2xl mb-8 font-semibold", className)} {...props}>
        { children }
    </h1>
}


export function BackButton({ className, children, ...props } : ButtonProps) {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return <Button onClick={goBack} variant="ghost" size='icon' className="mr-2" {...props}>
        <MoveLeft />
    </Button>
}