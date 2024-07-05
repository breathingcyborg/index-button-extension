import { KeysContextProvider } from "../../../components/keys/keys-context";
import { KeysList } from "@src/components/keys/keys-list";
import { BackButton, ScreenTitle } from "@src/components/ui/screen";

export function Keys() {

    return <div>
        <ScreenTitle>
            <BackButton/>
            Keys
        </ScreenTitle>
        <div className='flex flex-col gap-2'>
            <KeysContextProvider>
                <KeysList />
            </KeysContextProvider>
        </div>
    </div>
}
