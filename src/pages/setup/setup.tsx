import { ServiceAccountCredsStorage } from '@src/lib/service-account/creds-store';
import React, { useEffect, useState } from 'react';
import { Success } from './components/success';
import { AddKey } from './components/add-key';
import { Intro } from './components/intro';

export function Setup() {

  const [checking, setChecking] = useState(true);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let stale = false;
    async function init() {
      const store = new ServiceAccountCredsStorage();
      const creds = await store.getAll();
      if (stale) {
        return
      }
      setChecking(false);
      setComplete(creds.length > 0);
    }
    init();
    return () => { stale = true };
  }, []);

  if (checking) {
    return null;
  }

  if (complete) {
    return <Success />
  }

  return <div className='py-4 px-2'>
    <Intro />
    <AddKey onSuccess={() => setComplete(true)} />
  </div>
}
