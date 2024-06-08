import { createContext, useContext, useState } from "react";

export enum Screen {
    Loading,
    BulkIndex,
    SingleIndex,
}

export type PopupState = {
    screen: Screen;
    setScreen: (screen: Screen) => void,
}

const PopupContext = createContext<PopupState>({
    screen: Screen.Loading,
    setScreen: (screen: Screen) => {}
})

export function PopupContextProvider({ children }: { children: React.ReactNode }) {
    const [screen, setScreen] = useState<Screen>(Screen.Loading);
    return <PopupContext.Provider value={{ screen, setScreen }}>
        { children }
    </PopupContext.Provider>
}

export function usePopupContext() {
    return useContext(PopupContext);
}