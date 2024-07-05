import React from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/popup/index.css';
import '@assets/styles/tailwind.css';
import { Popup } from '@pages/popup/popup';
import { KeysContextProvider } from '@src/components/keys/keys-context';

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(
    <KeysContextProvider>
      <Popup />
    </KeysContextProvider>
  );
}

init();
