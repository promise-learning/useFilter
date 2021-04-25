import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useFilter } from '../dist';

// @ts-ignore
import data from '../data/sample.json';

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
  const { loading, data: result } = useFilter({ data, search, filters });

  const handleSearchChange = e => {
    setSearch({
      ...search,
      query: e.target.value,
    });
  };

  const handleFilterChange = (e, label: string) => {
    setFilters({
      ...filters,
      type: e.target.checked
        ? [...filters.type, label]
        : filters.type.filter(i => i !== label),
    });
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleSearchChange}
        placeholder="search director"
        style={{
          padding: 10,
          borderRadius: 4,
          border: '1px solid rgba(0, 0, 0, 0.7)',
        }}
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

      {loading ? 'Procsesing the data...' : ''}
      <p>
        <b>Filtered:</b> {result.length}
      </p>
      <ul>
        {result.map(
          (i: { show_id: string; type: string; director: string }) => (
            <li key={i.show_id}>
              <span>
                <b>Type: </b>
                {i.type}
              </span>{' '}
              <br />
              <span>
                <b>Director: </b>
                {i.director}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
