import 'jsdom-worker';
import { renderHook, cleanup } from '@testing-library/react-hooks';

// @ts-ignore
import data from '../data/sample.json';
import { useFilter } from '../src';

afterEach(() => {
  cleanup();
});

test('should filter data using useFilter', async () => {
  const searchData = {
    query: 'jorge',
    fields: ['director'],
    enableHighlighting: true,
  };
  const filters = {
    type: 'Movie',
  };
  const { result, waitForNextUpdate } = renderHook(() =>
    // @ts-ignore
    useFilter({ data, search: searchData, filters })
  );
  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.data.length).toBe(7);
  expect(result.current.data[0].director).toContain(
    `<mark class="use-filter-highlight">`
  );
});
