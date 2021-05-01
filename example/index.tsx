import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DataContextProvider } from './DataContext';
import Result from './Result';

const searchData = {
  query: '',
  fields: ['director'],
};

const filtersData: {
  type: string[];
} = {
  type: [],
};

const App = () => {
  const [filters, setFilters] = React.useState(filtersData);
  const [search, setSearch] = React.useState(searchData);

  const handleSearchChange = e => {
    setSearch({
      ...search,
      query: e.target.value,
    });
  };

  const handleFilterChange = (e, label) => {
    setFilters({
      ...filters,
      type: e.target.checked
        ? [...filters.type, label]
        : filters.type.filter(i => i !== label),
    });
  };

  return (
    <DataContextProvider>
      <div className="App">
        <h1>useFilter Demo</h1>
        <input
          type="text"
          placeholder="Search for director name"
          className="search-input"
          onChange={handleSearchChange}
        />
        <div style={{ marginTop: 10 }}>
          <b>Filter</b>
          <label>
            <input
              type="checkbox"
              onChange={e => handleFilterChange(e, 'Movie')}
              checked={filters.type.includes('Movie')}
            ></input>{' '}
            Movie
          </label>
          <label>
            <input
              type="checkbox"
              onChange={e => handleFilterChange(e, 'TV Show')}
              checked={filters.type.includes('TV Show')}
            ></input>{' '}
            TV Show
          </label>
        </div>
        <Result search={search} filters={filters} />
      </div>
    </DataContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
