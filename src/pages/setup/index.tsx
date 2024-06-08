import React from 'react';
import { createRoot } from 'react-dom/client';
import { Setup } from './setup';
import '@pages/setup/index.css';
import '@assets/styles/tailwind.css';
import { Screen } from './components/screen';

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Setup root element");
  const root = createRoot(rootContainer);
  root.render(
    <Screen>
      <Setup />
    </Screen>
  );
}

init();
