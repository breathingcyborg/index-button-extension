import { createRoot } from 'react-dom/client';
import './style.css' 
import { Buttons } from './buttons';
import { KeysContextProvider } from '@src/components/keys/keys-context';
import { Toaster } from "@src/components/ui/sonner";


const div = document.createElement('div');
div.id = '__root';
div.className = 'google-indexing-extension dark'
document.body.appendChild(div);

const rootContainer = document.querySelector('#__root');
if (!rootContainer) throw new Error("Can't find Options root element");
const root = createRoot(rootContainer);
root.render(
  <KeysContextProvider>
    <Buttons />
    <Toaster />
  </KeysContextProvider>
);

try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}
