# `useFilter`

A react hook to filter large amount of data in frontend using [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).In order to keep the main thread free and run the web application without any glitches we can leverage the use of [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) which runs on a separate thread and can share the messages with main thread. Internally it uses [Comlink](https://github.com/GoogleChromeLabs/comlink) for the webworker communication.

## [Live Demo](https://codesandbox.io/s/usefilter-demo-skp0g?file=/src/App.js)

## How to use

### Installation

- NPM: `npm install @promise_learning/usefilter`
- Yarn: `yarn add @promise_learning/usefilter`

### Usage

> We recommend using [react-window](https://www.npmjs.com/package/react-window) for rendering large data set. Also use [`useDebounce`](https://www.npmjs.com/package/use-debounce) hook with search

```jsx
  import { useFilter } from '@promise_learning/usefilter';
  import from './data.json';


  /////////////////////////////////////////
  // handle this using the state in ur app
  ////////////////////////////////////////

  const searchData = {
    query: '',
    fields: ['name'],
  };

  const filtersData = {
    category: ['Sci Fiction'],
  };


  export const App = () => {
    const { loading, data: result } = useFilter({ data, search: searchData, filters: filterData });

    if (loading) {
      return <div>Loading..</div>
    }

    return (
      <>
          // render result
      </>
    )
  }
```

### Parameters

| Parameter | Type                                                                                                         | Required |
| --------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| data      | Array                                                                                                        | `true`   |
| search    | Object -> `{query: '', fields: []}`. `query` is the search term and `fields` is the object keys to search on | `false`  |
| filters   | Object -> Key Value Pair. Where `key` is a field from object in array and value could be possible value      | `false`  |

### Data Returned

Object with following data is returned by the `useFilter` hook.

| Key     | Values           | Description                                      |
| ------- | ---------------- | ------------------------------------------------ |
| loading | `true` / `false` | Worker state if it is processing the data or not |
| data    | Array            | filtered response based on the input             |

# When to use?

- Filter / Search large list in frontend
- Filter / Search large data table in frontend

# License

[MIT License](https://github.com/promise-learning/useFilter/blob/main/LICENSE)
