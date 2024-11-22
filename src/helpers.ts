
export const LS = localStorage;



export function getFromLocalStorage <MyType>(key: string, defaultValue: MyType): MyType {
	const savedString = LS.getItem(key);
	if (savedString !== null) {
		const savedValue: MyType = JSON.parse(savedString);
		return savedValue;
	}

	return defaultValue;
}
