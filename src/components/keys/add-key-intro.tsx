import codeIcon from '@assets/img/icons/undraw_code_typing_re_p8b9.svg';

export function AddKeyIntro({ firstTime = true } : { firstTime?: boolean }) {
    return <div>
        {
            firstTime && (
                <h1 className="text-center text-3xl">
                    Get your pages indexed <br />
                    With google in 24 hours
                </h1>
            )
        }
        <div className="mt-4 text-center">
            <img src={codeIcon} />
        </div>
        <p className='text-xl text-center text-foreground/50 mt-4 inline-block'>
            Create a google service account key, that lets you submit pages for indexing
        </p>
    </div>
}