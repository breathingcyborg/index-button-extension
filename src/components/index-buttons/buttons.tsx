import '@assets/styles/tailwind.css';
import { useKeys } from "@src/components/keys/keys-context";
import { SetupButtons } from "./setup-buttons";
import { IndexingButtons } from "./indexing-buttons";
import { ButtonsContainer } from './buttons-container';

export function Buttons({ inPopup = false } : { inPopup?: boolean }) {
    const { keys } = useKeys();
    const hasKeys = keys.length > 0;

    return <ButtonsContainer inPopup={inPopup}>
        {
            !hasKeys ? <SetupButtons/> : <IndexingButtons />
        }
    </ButtonsContainer>
}

