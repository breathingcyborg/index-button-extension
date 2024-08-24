import { createRoot } from 'react-dom/client';
import '@pages/settings/index.css';
import '@assets/styles/tailwind.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Screen } from '@src/components/ui/screen';
import { KeysContextProvider } from '@src/components/keys/keys-context';
import { Toaster } from '@src/components/ui/sonner';

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Setup root element");
  const root = createRoot(rootContainer);
  root.render(
    <Screen>
      <KeysContextProvider>
        <Toaster />
        <RouterProvider router={router} />
      </KeysContextProvider>
    </Screen>
  );
}

init();
