import { AddKey as AddKeyComponent } from "@src/components/keys/add-key";
import { AddKeyIntro } from "@src/components/keys/add-key-intro";
import { BackButton, ScreenTitle } from "@src/components/ui/screen";
import { useNavigate } from 'react-router-dom';

export function AddKey() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return <div>
        <ScreenTitle>
            <BackButton/>
            Add Key
        </ScreenTitle>
        <div className='flex flex-col gap-2'>
            <AddKeyIntro firstTime={false} />
            <AddKeyComponent onSuccess={goBack} />
        </div>
    </div>
}
