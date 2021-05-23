import { HookParams } from '../types';

export function highlightSearch(value: string, searchQuery: string): string {
  const reg = new RegExp(
    searchQuery.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'),
    'i'
  );

  return value.replace(
    reg,
    str => `<mark class="use-filter-highlight">${str}</mark>`
  );
}

export function filterFn<Item extends Record<string, unknown>>({
  data = [],
  filters = {},
  search = {
    query: '',
    fields: [],
  },
}: HookParams<Item>) {
  let result = Object.assign(data);

  if (search && search.query && search.query.trim()) {
    const queryLowerCase = search.query.toLowerCase();
    if (search.enableHighlighting) {
      result = data.reduce((acc: Item[], item: Item) => {
        let hasSearchTerm = false;
        const itemToReturn = Object.assign({}, item);
        search.fields.forEach((field: string) => {
          const fieldVal = (item[field] as string).toString().toLowerCase();
          if (fieldVal.includes(queryLowerCase)) {
            hasSearchTerm = true;
            // @ts-ignore
            itemToReturn[field] = highlightSearch(fieldVal, queryLowerCase);
          }
        });

        if (hasSearchTerm) {
          return acc.concat(itemToReturn);
        }

        return acc;
      }, []);
    } else {
      result = data.filter((item: Item) =>
        search.fields.some((field: string) => {
          const fieldLowerCase = (item[field] as string).toLowerCase();
          return fieldLowerCase.includes(queryLowerCase);
        })
      );
    }
  }

  if (filters && Object.keys(filters).length) {
    Object.keys(filters).forEach((field: string) => {
      if (filters[field] && filters[field].length) {
        result = result.filter((item: Item) =>
          filters[field].includes(item[field] as string)
        );
      }
    });
  }
  return result;
}
