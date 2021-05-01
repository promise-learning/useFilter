import * as React from 'react';
import { FixedSizeList as List } from 'react-window';
import { DataContext } from './DataContext';

import { useFilter } from '../src';

const Result = ({ search, filters }) => {
  const { data } = React.useContext(DataContext);
  const { loading, data: result } = useFilter({ data, search, filters });

  return (
    <div
      style={{
        marginTop: 20,
        width: 500,
        border: '1px solid #dfdfdf',
        borderRadius: 2,
        padding: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <b>id </b>
        </div>
        <div>
          <b>Director </b>{' '}
        </div>
        <div>
          <b>Type </b>{' '}
        </div>
      </div>
      <hr />

      {loading ? (
        <h1>Filtering data...</h1>
      ) : (
        <>
          {result.length > 0 ? (
            <>
              <List
                height={300}
                itemCount={result.length}
                itemSize={25}
                width={500}
              >
                {({ index, style }) => (
                  <div
                    style={{
                      ...style,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>{result[index].show_id}</div>
                    <div>{result[index].director}</div>
                    <div>{result[index].type}</div>
                  </div>
                )}
              </List>
            </>
          ) : (
            <h1> Data Not Found</h1>
          )}
        </>
      )}
    </div>
  );
};

export default Result;
