export interface Filter {
  [name: string]: string | string[];
}

export interface Search {
  query: string;
  fields: string[];
  highlight?: boolean;
}

export interface HookParams<Item> {
  data: Item[];
  filters?: Filter;
  search?: Search;
}
