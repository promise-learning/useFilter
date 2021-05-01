import { Filter, Search } from '../types';

export function hasFilters(
  search: Search = {
    query: '',
    fields: [],
  },
  filters: Filter = {}
): boolean {
  if (search && search.query && search.query.trim()) return true;

  return Object.keys(filters).some(
    item => filters[item] && filters[item].length
  );
}
