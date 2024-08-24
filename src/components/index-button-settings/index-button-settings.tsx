import { IndexButtonSettingsContextProvider } from "./index-button-settings-context";
import { Loader } from "./loader";
import { Form } from "./form";

export function IndexButtonSettings() {
    return <IndexButtonSettingsContextProvider>
        <Loader>
            <Form />
        </Loader>
    </IndexButtonSettingsContextProvider>
}


