import React, { useRef, useState } from 'react';
import { useWorker, WORKER_STATUS } from '@koale/useworker';
import Fuse from 'fuse.js';
import { filterData, hasFilters } from './filter';

export const useFilter = ({ data, fuseOptions, filters }) => {
  const fuseInstance = useRef(new Fuse(fuseOptions));
  const [result, setResult] = useState(data);

  const [
    filterWorker,
    { status: filterWorkerStatus, kill: killWorker },
  ] = useWorker(filterData, {
    autoTerminate: false, // you should manually kill the worker using "killWorker()"
    remoteDependencies: [
      'https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js',
    ],
  });

  React.useEffect(
    () => () => {
      killWorker(); // [UN-MOUNT] Since autoTerminate: false we need to kill the worker manually (recommended)
    },
    [killWorker]
  );

  // React.useEffect(() => {
  //   console.log('WORKER:', filterWorkerStatus);
  // }, [filterWorkerStatus]);

  React.useEffect(() => {
    let isMounted = true;

    async function filterFunc() {
      const res = await filterWorker({
        data,
        filters,
        fuseInstance: fuseInstance.current,
      });
      console.log({ res });
      if (isMounted) {
        setResult(res);
      }
    }

    filterFunc();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  return {
    loading: filterWorkerStatus === WORKER_STATUS.RUNNING,
    data: hasFilters(filters) ? result : data,
    error: null,
  };
};
