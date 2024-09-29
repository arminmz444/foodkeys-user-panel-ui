'use client';

import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export function useDirection() {
  const [direction, setDirection] = useLocalStorage('iso-direction', 'rtl');

  useEffect(() => {
    document.documentElement.dir = direction ?? 'rtl';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  return {
    direction: direction ? direction : 'rtl',
    setDirection,
  };
}
