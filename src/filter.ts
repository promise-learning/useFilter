export function hasFilters({ search, ...aggs }: any): boolean {
  const filterToBeApplied = Object.keys(aggs).find((field: string) => {
    return aggs[field]?.length > 0;
  });

  return filterToBeApplied || search;
}

export function filterData({ fuseInstance, filters }: any) {
  let result = fuseInstance.search(filters.search);

  Object.keys(filters).forEach((field: string) => {
    result = result.filters((item: any) => filters[field].includes(item[field]));
  });

  return result;
}
