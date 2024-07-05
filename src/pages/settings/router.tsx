import { createHashRouter, Link } from 'react-router-dom';
import { Settings } from './routes/settings';
import { Keys } from './routes/keys';
import { AddKey } from './routes/add-key';
import { IndexButton } from './routes/index-button';

export const router = createHashRouter([
    {
        path: '/',
        element: <Settings/>
    },
    {
        path: '/keys',
        element: <Keys />
    },
    {
        path: '/keys/add',
        element: <AddKey />
    },
    {
        path: '/index-button',
        element: <IndexButton />
    },
])