import { Filter, HookParams, Search } from '../types';

export function hasFilters(
  search: Search = {
    query: '',
    fields: [],
  },
  filters: Filter = {}
): boolean {
  if (search && search.query && search.query.trim()) return true;

  return Object.keys(filters).some(item => filters[item] && filters[item].length);
}

export function filterData({
  data = [],
  filters = {},
  search = {
    query: '',
    fields: [],
  },
}: HookParams) {
  let result = [...data];

  if (search && search.query && search.query.trim()) {
    result = data.filter((item: any) =>
      search.fields.some((field: string) =>
        item[field].toLowerCase().includes(search.query.toLowerCase())
      )
    );
  }

  Object.keys(filters).forEach((field: string) => {
    if (filters[field] && filters[field].length) {
      result = result.filter((item: any) =>
        filters[field].includes(item[field])
      );
    }
  });

  return result;
}
