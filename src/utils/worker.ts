import { HookParams } from '../types';

export function filterFn({
  data = [],
  filters = {},
  search = {
    query: '',
    fields: [],
  },
}: HookParams) {
  let result = Object.assign(data);

  if (search && search.query && search.query.trim()) {
    result = data.filter((item: any) =>
      search.fields.some((field: string) =>
        item[field].toLowerCase().includes(search.query.toLowerCase())
      )
    );
  }

  if (filters && Object.keys(filters).length) {
    Object.keys(filters).forEach((field: string) => {
      if (filters[field] && filters[field].length) {
        result = result.filter((item: any) =>
          filters[field].includes(item[field])
        );
      }
    });
  }
  return result;
}
