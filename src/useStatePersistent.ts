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
