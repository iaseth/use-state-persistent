
# use-state-persistent
`useStatePersistent` is a custom React hook that
adds **persistence** to the standard `useState` hook
using the **LocalStorage** in the web browser.

#### Installation

```
npm install use-state-persistent
```

#### Import

```ts
import { useStatePersistent } from 'use-state-persistent';
```

#### Usage
The usage syntax is similar to `useState` except for the extra `key` argument.
Here, `0` is the **initial value** for `x` and `'my-key-for-x'` is the
**unique key** using which `x` will be saved in **LocalStorage**.

```ts
const [x, setX] = useStatePersistent(0, 'my-key-for-x');
```

`useStatePersistent` will check if there already exists a value for
`my-key-for-x` in the **LocalStorage** and will return it if it exists.
Otherwise the `initial` value will be returned.

Thereafter, every subsequent call to `setX` will save the new value to the **LocalStorage**.


I am using [`readmix`](https://github.com/iaseth/readmix) for generating this README.
You can view the source file [here](https://github.com/iaseth/use-state-persistent/blob/master/README.md.rx).


## Source Code
```ts
import React from "react";



export const useStatePersistent = <StateType>(initialValue: StateType, key: string): [
	StateType,
	(v: StateType | ((v: StateType) => StateType)) => void
] => {
	// Get the stored value or fallback to the initial value
	const [storedValue, setStoredValue] = React.useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	});

	const setStoredValueLS = (value: StateType | ((v: StateType) => StateType)) => {
		try {
			// If value is a function (updater form)
			const valueToStore = value instanceof Function ? value(storedValue) : value;

			// Update state
			setStoredValue(valueToStore);

			// Save to localStorage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error("Error setting localStorage", error);
		}
	};

	return [storedValue, setStoredValueLS];
};

export default useStatePersistent;

```


## Package details
| `Name`         | `Value`                                                     |
| -------------- | ----------------------------------------------------------- |
| `Name`         | `use-state-persistent`                                      |
| `Description`  | `A persistent version of useState Hook using LocalStorage.` |
| `Version`      | `1.2.0`                                                     |
| `Author`       | `iaseth`                                                    |
| `Homepage`     | `https://github.com/iaseth/use-state-persistent`            |
| `Repository`   | `iaseth/use-state-persistent`                               |
| `License`      | `MIT`                                                       |
| `Dependencies` | `2`                                                         |



## Dependencies
|     | `Package`   | `Version`   |
| --- | ----------- | ----------- |
| 1   | `react`     | `^18.3.1`   |
| 2   | `react-dom` | `^18.3.1`   |



## Dev dependencies
|     | `Package`      | `Version`   |
| --- | -------------- | ----------- |
| 1   | `@types/react` | `^18.3.12`  |
| 2   | `eslint`       | `^9.15.0`   |



## License
File not found: LICENSE.md



## Credit

This file was generated using [`readmix`](https://github.com/iaseth/readmix).


