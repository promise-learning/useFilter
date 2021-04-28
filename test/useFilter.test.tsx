import 'jsdom-worker';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { filterData } from '../src/utils/filterData';
import { Search, Filter } from '../src/types/';

// @ts-ignore
import data from '../data/sample.json';
import { useFilter } from '../dist';

function sleep(ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const TestComponent = ({
  search,
  filters,
}: {
  search: Search;
  filters: Filter;
}) => {
  //@ts-ignore
  const { loading, data: result } = useFilter({ data, search, filters });

  if (loading) {
    return <div>loading</div>;
  }
  return <div>{result.length}</div>;
};

describe('it', () => {
  it('searches data', async () => {
    const searchData = {
      query: 'jorge',
      fields: ['director'],
    };

    //@ts-ignore
    const result = filterData({ data, search: searchData });
    expect(result.length).toBe(7);
  });

  it('filters data', async () => {
    const filters = {
      type: 'Movie',
    };

    //@ts-ignore
    const result = filterData({ data, filters });
    expect(result.length).toBe(5377);
  });

  it('search and filter data', async () => {
    const searchData = {
      query: 'jorge',
      fields: ['director'],
    };
    const filters = {
      type: 'Movie',
    };

    //@ts-ignore
    const result = filterData({ data, filters, search: searchData });
    expect(result.length).toBe(7);
  });

  it('useFilter hook runs correctly', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const searchData = {
      query: 'jorge',
      fields: ['director'],
    };
    const filters = {
      type: 'Movie',
    };

    act(() => {
      render(
        <TestComponent search={searchData} filters={filters} />,
        container
      );
    });
    expect(container.textContent).toBe('loading');

    await sleep(500);
    expect(container.textContent).toBe('7');

    unmountComponentAtNode(container);
    container.remove();
  });
});
