import { useEffect, useState, useMemo } from 'react';

import { HookParams } from './types';
import { hasFilters } from './utils/hasFilter';
import { filterFn } from './utils/worker';

const code = `
  ${filterFn.toString()}
  onmessage = function(e) {
    const params = e.data;
    const filterData = filterFn(params)
    postMessage(filterData);
  };
`;

const worker = new Worker(
  URL.createObjectURL(new Blob([code], { type: 'text/javascript' }))
);

export const useFilter = ({ data, search, filters }: HookParams) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const isHavingFilters = useMemo(() => hasFilters(search, filters), [
    search,
    filters,
  ]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setLoading(true);
    }
    if (isHavingFilters) {
      worker.postMessage({ data, search, filters });
      worker.onmessage = e => {
        if (isMounted) {
          setLoading(false);
          setResult(e.data);
        }
      };

      worker.onerror = e => {
        console.error(`Web worker error`, e);
        if (isMounted) {
          setLoading(false);
        }
      };
    }

    return () => {
      isMounted = false;
    };
  }, [search, filters]);

  return { loading, data: isHavingFilters ? result : data };
};
