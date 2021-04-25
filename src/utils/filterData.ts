import { Filter, Search, HookParams } from '../types';

export function hasFilters(
  search: Search = {
    query: '',
    fields: [],
  },
  filters: Filter = {}
): boolean {
  if (search.query.trim()) return true;
  return Object.keys(filters).some(item => filters[item].length);
}

export function filterData({
  data = [],
  filters = {},
  search = {
    query: '',
    fields: [],
  },
}: HookParams) {
  console.log({ search, filters });
  let result = [...data];

  if (search.query.trim()) {
    result = data.filter((item: any) =>
      search.fields.some(field =>
        item[field].toLowerCase().includes(search.query.toLocaleLowerCase())
      )
    );
  }

  Object.keys(filters).forEach((field: string) => {
    if (filters[field].length) {
      result = result.filter((item: any) =>
        filters[field].includes(item[field])
      );
    }
  });

  return result;
}
