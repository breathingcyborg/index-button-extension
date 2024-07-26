import React from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/settings/index.css';
import '@assets/styles/tailwind.css';
import { Screen } from '@src/components/ui/screen';
import { KeysContextProvider } from '@src/components/keys/keys-context';
import { BulkIndexPage } from './components/bulk-index-page';
import { BulkIndexContextProvider } from './context/bulk-index-context';

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Setup root element");
  const root = createRoot(rootContainer);
  root.render(
    <KeysContextProvider>
      <BulkIndexContextProvider>
        <BulkIndexPage />
      </BulkIndexContextProvider>
    </KeysContextProvider>
  );
}

init();
