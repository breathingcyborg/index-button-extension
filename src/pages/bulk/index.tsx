import { createRoot } from 'react-dom/client';
import '@pages/settings/index.css';
import '@assets/styles/tailwind.css';
import { KeysContextProvider } from '@src/components/keys/keys-context';
import { BulkPage } from './bulk-page';
import { Toaster } from '@src/components/ui/sonner';
import { WorkerStarter } from '@src/components/bulk-indexing/worker-starter';


function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Setup root element");
  const root = createRoot(rootContainer);
  root.render(
    <KeysContextProvider>
      <WorkerStarter />
      <Toaster />
      <BulkPage />
    </KeysContextProvider>
  );
}

init();
