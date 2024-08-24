import { createRoot } from 'react-dom/client';
import './style.css' 
import { Buttons } from '../../components/index-buttons/buttons';
import { KeysContextProvider } from '@src/components/keys/keys-context';
import { Toaster } from "@src/components/ui/sonner";
import { GetButtonSettingsRequest } from '@src/background-message-handlers/button-settings/get-button-settings';
import { ButtonSettings } from '@src/lib/button-settings/button-settings-repo';
import { shouldShowIndexingButton } from '@src/lib/button-settings/utils';

async function init() {

  // Fetch button settings
  const settings : ButtonSettings = await chrome.runtime.sendMessage({
    type: 'getButtonSettings'
  } satisfies GetButtonSettingsRequest);

  // Check if we should show indexing button on this site
  const showButton = shouldShowIndexingButton(settings, window.location.href);
  if (!showButton) {
    return
  }

  // create root
  const div = document.createElement('div');
  div.id = '__root';
  div.className = 'google-indexing-extension dark'
  document.body.appendChild(div);
  
  // render components
  const rootContainer = document.querySelector('#__root');
  if (!rootContainer) throw new Error("Can't find Options root element");
  const root = createRoot(rootContainer);
  root.render(
    <KeysContextProvider>
      <Buttons />
      <Toaster />
    </KeysContextProvider>
  );
}

init();