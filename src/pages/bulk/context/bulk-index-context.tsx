import { IndexPageRequest, StatusResponse } from "@src/background-message-handlers"
import { createContext, useContext, useState } from "react"

export enum BulkIndexStep {
    InputUrls='input_urls',
    Indexing='indexing',
    Done='done',
}

export enum UrlStatus {
    Pending='pending',
    Indexing='indexing',
    Success='success',
    Failed='failed',
}

export type UrlState = {
    url: string,
    status: UrlStatus,
    errorMessage: string,
}

export type BulkIndexState = {
    step: BulkIndexStep,
    urls: UrlState[],
}

export type BulkIndexMethods = {
    startIndexing: (urls: string[]) => void | Promise<void>,
    restart: () => void,
}

export type BulkIndexContextType = BulkIndexState & BulkIndexMethods

const initialData : BulkIndexContextType = {
    startIndexing: () => {},
    step: BulkIndexStep.InputUrls,
    urls: [],
    restart: () => {},
}

const BulkIndexContext = createContext<BulkIndexContextType>(initialData);

export const BulkIndexContextProvider = ({ children } : { children: React.ReactNode }) => {

    const [step, setStep] = useState(BulkIndexStep.InputUrls);
    const [urls, setUrls] = useState<UrlState[]>([]);

    const startIndexing = async (urls: string[]) => {
        console.log("Start Indexing");

        const validURLS = urls.filter(url => {
            try {
                let parsed = new URL(url);
                return true
            } catch(e) {
                return false
            }
        });

        console.log(`validUrls ${validURLS}`);

        const urlStates : UrlState[] = validURLS.map(url => ({
            errorMessage: '',
            status: UrlStatus.Pending,
            url: url,
        }));

        console.log(`urlState ${urlStates}`);

        setUrls(urlStates);

        setStep(BulkIndexStep.Indexing);

        await bulkIndexUrls(validURLS);
    }

    async function bulkIndexUrls(urls: string[]) {

        console.log("Bulk Indexing Urls");

        for (let url of urls) {

            console.log(`indexing url ${url}`);

            let indexed = false;

            // mark indexing
            setUrls(prevURLS => prevURLS.map((u) => {
                console.log("url");
                if (u.url !== url) {
                    console.log("differnte url");
                    return u
                }
                if (u.status === UrlStatus.Success) {
                    console.log("already indexed");
                    indexed = true;
                    return u;
                }
                console.log("not indexed");
                return {
                    ...u,
                    status: UrlStatus.Indexing,
                    errorMessage: '',
                }
            }))

            console.log(`indexed ${indexed}`);

            // continue as url is already indexed
            if (indexed) {
                console.log(`already indexed continue`);
                continue;
            }

            // request indexing
            const response: StatusResponse = await chrome.runtime.sendMessage({
                payload: {
                    url: url,
                },
                type: 'indexPage',
            } satisfies IndexPageRequest)

            console.log(`response ${response}`);

            // update state
            setUrls(prevURLS => prevURLS.map((u) => {
                if (u.url !== url) {
                    return u
                }
                return {
                    url: u.url,
                    status: response.success ? UrlStatus.Success : UrlStatus.Failed,
                    errorMessage: response.success ? '' : response.message || 'Something went wrong',
                }
            }))
        }

        setStep(BulkIndexStep.Done)
    }

    const restart = () => {
        setStep(BulkIndexStep.InputUrls);
        setUrls([]);
    }

    const value : BulkIndexContextType = {
        startIndexing,
        step,
        urls,
        restart,
    }

    return <BulkIndexContext.Provider value={value}>
        { children }
    </BulkIndexContext.Provider>
}

export const useBulkIndexContext = () => useContext(BulkIndexContext);