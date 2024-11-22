import { LS, getFromLocalStorage } from "./helpers";
import React from "react";



export const useStatePersistent = (key: string, intial: string): [string, (v: string) => void] => {
	const [value, setValue] = React.useState(getFromLocalStorage(key, intial));
	const setValueLS = (v: string) => {
		setValue(v);
		LS.setItem(key, JSON.stringify(v));
	};

	return [value, setValueLS];
};

export default useStatePersistent;
