import { useState, useEffect, useMemo } from 'react';
import { HookParams } from './types';
import { hasFilters } from './utils/hasFilter';
import { createComlink } from './utils/comlink';

const useComlink = createComlink(() => new Worker('./utils/worker.ts'));

export const useFilter = ({ data, search, filters }: HookParams) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(data);
  const { proxy } = useComlink();

  const isHavingFilters = useMemo(() => hasFilters(search, filters), [
    search,
    filters,
  ]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (isMounted) {
        setLoading(true);
      }
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
    data: isHavingFilters ? result : data,
  };
};
