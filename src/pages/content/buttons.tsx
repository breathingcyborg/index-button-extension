import '@assets/styles/tailwind.css';
import { useKeys } from "@src/components/keys/keys-context";
import { SetupButtons } from "./components/setup-buttons";
import { IndexingButtons } from "./components/indexing-buttons";

export function Buttons() {
    const { keys } = useKeys();
    const hasKeys = keys.length > 0;

    return !hasKeys ? <SetupButtons/> : <IndexingButtons />
}

