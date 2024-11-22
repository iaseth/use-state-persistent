import { LS, getFromLocalStorage } from "./helpers";
import React from "react";



export const useStatePersistent = <MyType>(key: string, intial: MyType): [MyType, (v: MyType) => void] => {
	const [value, setValue] = React.useState(getFromLocalStorage(key, intial));

	const setValueLS = (v: MyType) => {
		setValue(v);
		LS.setItem(key, JSON.stringify(v));
	};

	return [value, setValueLS];
};

export default useStatePersistent;
