interface FirstType {
	id: number;
	firstName: string;
	lastName: string;
}

interface SecondType {
	id: number;
	address: string;
	city: string;
}

type ExcludeType = Exclude<keyof FirstType, keyof SecondType>;
