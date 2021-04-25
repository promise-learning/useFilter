import { useState, useEffect } from 'react';
import { useWorker, WORKER_STATUS } from '@koale/useworker';

import { filterData, hasFilters } from './utils/filterData';
import { HookParams } from './types';

export const useFilter = ({ data, search, filters }: HookParams) => {
  const [result, setResult] = useState(data);

  const [
    filterWorker,
    { status: filterWorkerStatus, kill: killWorker },
  ] = useWorker(filterData, {
    autoTerminate: false, // prevent termination of worker after
  });

  useEffect(
    () => () => {
      killWorker();
    },
    [killWorker]
  );

  useEffect(() => {
    let isMounted = true;

    async function workerCallback() {
      const res = await filterWorker({
        data,
        search,
        filters,
      });
      if (isMounted) {
        setResult(res);
      }
    }

    if (filterWorkerStatus !== WORKER_STATUS.RUNNING) {
      killWorker();
    }

    workerCallback();

    () => {
      isMounted = false;
    };
  }, [search, filters]);

  const isHavingFilters = hasFilters(search, filters);

  return {
    loading: filterWorkerStatus === WORKER_STATUS.RUNNING,
    data: isHavingFilters ? result : data,
  };
};
