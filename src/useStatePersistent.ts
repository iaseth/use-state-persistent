import { LS, getFromLocalStorage } from "./helpers";
import React from "react";



export const useStatePersistent = <MyType>(intial: MyType, key: string): [MyType, (v: MyType) => void] => {
	const [value, setValue] = React.useState(getFromLocalStorage(key, intial));

	const setValueLS = (v: MyType) => {
		setValue(v);
		LS.setItem(key, JSON.stringify(v));
	};

	return [value, setValueLS];
};

export default useStatePersistent;
