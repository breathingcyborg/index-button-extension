import { buttonVariants } from '@src/components/ui/button';
import { ScreenTitle } from '@src/components/ui/screen';
import { cn } from '@src/lib/utils/cn';
import { ChevronRightIcon, SettingsIcon } from 'lucide-react';
import { Link, LinkProps } from 'react-router-dom';

export function Settings() {
    return <div>
        <ScreenTitle>
            <SettingsIcon className='inline-block mr-2' />
            Settings
        </ScreenTitle>
        <ul className='divide-y-[0.5px] divide-border'>
            <SetingsListItem>
                <SettingsLink to="/keys">
                    Manage Keys
                </SettingsLink>
            </SetingsListItem>
            <SetingsListItem>
                <SettingsLink to="/index-button">
                    Index Button
                </SettingsLink>
            </SetingsListItem>
        </ul>
    </div>
}

const SetingsListItem = ({ className, children, ...props } : React.HTMLAttributes<HTMLLIElement>) => {
    return <li className={cn('py-1', className)} {...props}>
        { children }
    </li>
}

const SettingsLink = ({ className, children, ...props }: LinkProps) => {
    return <Link 
        className={cn(
            buttonVariants({ variant: 'ghost' }),
            "text-left flex justify-between",
            className,
        )}
        {...props}
    >
        { children }
        <ChevronRightIcon />
    </Link>
}