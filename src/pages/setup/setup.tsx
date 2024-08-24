import { useState } from 'react';
import { SetupComplete } from './components/setup-complete';
import { AddKey } from '../../components/keys/add-key';
import { AddKeyIntro } from '../../components/keys/add-key-intro';
import { useKeys } from '@src/components/keys/keys-context';

export function Setup() {

  const [complete, setComplete] = useState(false);
  const { keys } = useKeys();
  const hasKeys = keys.length > 0;

  if (complete || hasKeys) {
    return <SetupComplete />
  }

  return <div className='py-4 px-2'>
    <AddKeyIntro />
    <AddKey onSuccess={() => setComplete(true)} />
  </div>
}
