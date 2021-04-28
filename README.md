# `useFilter`

A hook to filter large amount of data in frontend. This filter uses [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to process the data and thus doesn't block the application thread.

## [Example](https://github.com/promise-learning/useFilter/tree/main/example)

## How to use

### Installation

- NPM: `npm install @promise_learning/usefilter`
- Yarn: `yarn add @promise_learning/usefilter`

### Usage

```jsx
  import { useFilter } from '@promise_learning/usefilter';
  import from './data.json';


  /////////////////////////////////////
  Handle this using the state in ur app
  ////////////////////////////////////

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

| Parameter | Type                                                                                                    | Required |
| --------- | ------------------------------------------------------------------------------------------------------- | -------- |
| data      | Array                                                                                                   | `true`   |
| search    | Object -> `{query: '', fields: ''}`                                                                     | `false`  |
| filters   | Object -> Key Value Pair. Where `key` is a field from object in array and value could be possible value | `false`  |

### Data Returned

Object with following data is returned by the `useFilter` hook.

| Key     | Values           | Description                                      |
| ------- | ---------------- | ------------------------------------------------ |
| loading | `true` / `false` | Worker state if it is processing the data or not |
| data    | Array            | filtered response based on the input             |
