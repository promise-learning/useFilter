export function hasFilters(filters) {
  return true;
}

export function filterData({ data, fuseInstance, filters }) {
  const result = fuseInstance.search(filters.search);
  return result;
}
