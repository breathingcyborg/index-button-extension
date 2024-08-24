import { BackButton, ScreenTitle } from "@src/components/ui/screen";
import { IndexButtonSettings } from "@src/components/index-button-settings/index-button-settings";

export const IndexButton = () => {
    return <div>
        <ScreenTitle>
            <BackButton />
            Index Button Settings
        </ScreenTitle>
        <div className='flex flex-col gap-2'>
            <IndexButtonSettings />
        </div>
    </div>
}
