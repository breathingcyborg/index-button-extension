

export function Screen({ children }: { children: React.ReactNode }) {
    return <div className="flex justify-center items-center w-screen h-screen">
        <div className="w-[400px] h-[600px] py-4 px-2">
            {children}
        </div>
    </div>
}