import type { AddKeyRequest, GetKeysRequest, RemoveKeyRequest } from "@src/background-message-handlers";
import type { ServiceAccountCreds } from "@src/lib/service-account";
import { createContext, useContext, useEffect, useState } from "react";

export type KeysContextState = {
    keys: ServiceAccountCreds[]
    refetch: () => void | Promise<void>,
    remove: (index: number) => void | Promise<void>,
    add: (json: Object) => Promise<{ success: boolean, message: string }>,
}

const KeysContext = createContext<KeysContextState>({
    keys: [],
    refetch: () => {},
    remove: (index: number) => {},
    add: async (json: Object) => ({ success: false, message: 'Context Provider Missing' })
});


export function KeysContextProvider({ children } : { children: React.ReactNode }) {
    const [keys, setKeys] = useState<ServiceAccountCreds[]>([]);
    
    const refetch = async () => {
        const keys : ServiceAccountCreds[] = await chrome.runtime.sendMessage({
            type: 'getKeys',
        } satisfies GetKeysRequest);
        setKeys(keys);
    }

    const remove = async (index: number) => {
        await chrome.runtime.sendMessage({
            type: 'removeKey',
            payload: {
                index: index
            }
        } satisfies RemoveKeyRequest)
        refetch();
    }

    const add = async (json: Object) => {
        const response = await chrome.runtime.sendMessage({
            type: 'addKey',
            payload: {
                json
            }
        } satisfies AddKeyRequest)
        refetch()
        return response;
    }

    useEffect(() => {
        refetch();
    }, [ refetch ]);

    const value : KeysContextState = {
        keys,
        refetch,
        remove,
        add
    }

    return <KeysContext.Provider value={value}>
        { children }
    </KeysContext.Provider>
}

export const useKeys = () => useContext(KeysContext);