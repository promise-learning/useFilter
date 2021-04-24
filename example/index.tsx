import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ChakraProvider,
  Checkbox,
  CheckboxGroup,
  Input,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';

import showTitles from './titles.json'

import { useFilter } from '../src';

const App = () => {
  const [search, setSearch] = React.useState('');
  const [rating, setRating] = React.useState([]);
  const [type, setType] = React.useState('');
  const [data, setData] = React.useState([]);

  const filterParams = React.useMemo(() => ({
    data,
    fuseOptions: {
      keys: ['title', 'author.firstName'],
    },
    filters: {
      search,
      type: [type],
      rating,
    },
  }), [data,search,type, rating]);

  const { data: filteredData, loading } = useFilter(filterParams);

  React.useEffect(() => {

    const timerId = setTimeout(() => {
      setData(showTitles)
    }, 250);

    return () => clearTimeout(timerId)
  }, []);

  return (
    <div>
      <Input
        onChange={e => setSearch(e.target.value)}
        value={search}
        placeholder="small size"
        size="sm"
      />

      <RadioGroup onChange={newType => setType(newType)} value={type}>
        <Stack direction="row">
          <Radio value="Movie">Movie</Radio>
          <Radio value="TV Show">TV Show</Radio>
        </Stack>
      </RadioGroup>

      <CheckboxGroup
        onChange={newRatings => setRating(newRatings)}
        defaultValue={rating}
      >
        <Stack direction="row">
          <Checkbox value="TV-MA">TV-MA</Checkbox>
          <Checkbox value="TV-14">TV-14</Checkbox>
        </Stack>
      </CheckboxGroup>

      <List spacing={3}>
        {filteredData.map(item => (
          <ListItem key={item.show_id}>
            <span color="gray.600">{item.type}</span>
            <span color="gray.400">{item.title}</span>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
