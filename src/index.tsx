import { useState, useEffect, useMemo } from 'react';
import { useWorker, WORKER_STATUS } from '@koale/useworker';
import { useDebounce } from 'use-debounce'

import { filterData, hasFilters } from './utils/filterData';
import { HookParams } from './types';

export const useFilter = ({ data, search, filters }: HookParams) => {
  const [result, setResult] = useState(data);
  const [debouncedSearch] = useDebounce(search, 100);
  const [debouncedFilters] = useDebounce(filters, 100);

  const isHavingFilters = useMemo(() => hasFilters(search, filters), [search, filters]);

  const [
    filterWorker,
    { status: filterWorkerStatus, kill },
  ] = useWorker(filterData, {
    autoTerminate: false,
  });

  useEffect(() => {
    return () => kill();
  }, [])

  useEffect(() => {
    let isActive = true;

    async function workerCallback() {
      const res = await filterWorker({
        data,
        search: debouncedSearch,
        filters: debouncedFilters,
      });
      if (isActive) {
        setResult(res);
      }
    }

    workerCallback();

    return () => {
      isActive = false;
      kill();
    };
  }, [debouncedSearch, debouncedFilters, kill]);


  if (isHavingFilters) {
    return {
      loading: filterWorkerStatus === WORKER_STATUS.RUNNING,
      data: result,
    };
  }

  return {
    loading: false,
    data,
  };
};
