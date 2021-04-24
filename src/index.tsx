import React, { useRef, useState } from 'react';
import { useWorker, WORKER_STATUS } from '@koale/useworker';
import Fuse from 'fuse.js';

import { filterData, hasFilters } from './filter';

// TODO: Figure out how to add search: string; Remove 8 line it is not good practice
// Reuse in filter.ts
interface Filter {
  [name: string]: string | [string];
}
interface Props {
  data: any;
  filters: Filter;
  fuseOptions: any; // TODO: Figure out how to use Fuse.Options
}

export const useFilter = ({ data, fuseOptions, filters }: Props) => {
  const fuseInstance = useRef(new Fuse(data, fuseOptions));
  const [result, setResult] = useState(data);
  const needWorkerResults = hasFilters(filters);

  const [
    filterWorker,
    { status: filterWorkerStatus, kill: killWorker },
  ] = useWorker(filterData, {
    autoTerminate: false, // prevent termination of worker after success and failure
    remoteDependencies: [
      'https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js',
    ],
  });

  React.useEffect(
    () => () => {
      killWorker();
    },
    [killWorker]
  );

  React.useEffect(() => {
    // Do not set stale response if the component unmounts or filters changes
    let isCancelled = true;

    async function filterFunc() {
      const res = await filterWorker({
        data,
        filters,
        fuseInstance: JSON.stringify(fuseInstance.current),
      });

      if (isCancelled) {
        setResult(res);
      }
    }

    if (needWorkerResults) {
      filterFunc();
    }

    return () => {
      isCancelled = false;
    };
  }, [filters, needWorkerResults]);

  return {
    loading: filterWorkerStatus === WORKER_STATUS.RUNNING,
    data: needWorkerResults ? result : data,
  };
};
