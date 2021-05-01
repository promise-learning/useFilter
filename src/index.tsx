import { useState, useEffect } from 'react';
import { HookParams } from './types';
import { createComlink } from './utils/comlink';

const useComlink = createComlink(() => new Worker('./utils/worker.ts'));

export const useFilter = ({ data, search, filters }: HookParams) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(data);
  const { proxy } = useComlink();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setLoading(true);
    }
    (async () => {
      // @ts-ignore
      const res = await proxy({ data, search, filters });
      if (isMounted) {
        setLoading(false);
        setResult(res);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [proxy, search, filters]);

  return {
    loading,
    data: result,
  };
};
