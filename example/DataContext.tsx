import * as React from 'react';

export const DataContext = React.createContext([]);

export const DataContextProvider = ({ children }) => {
  const [data, setData] = React.useState({ loading: true, data: [] });
  React.useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      const res = await fetch(`sample.json`);
      const resData = await res.json();

      if (isMounted) {
        setData({
          loading: false,
          data: resData,
        });
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (data.loading) {
    return <h1>Loading data... </h1>;
  }
  return (
    <DataContext.Provider value={data.data}>{children}</DataContext.Provider>
  );
};
