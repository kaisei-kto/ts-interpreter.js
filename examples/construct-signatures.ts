type SomeConstructor = {
	new(s: string): SomeObject;
};

interface CallOrConstruct {
	new(s: string): Date;
	(n?: number): number;
}

function fn(ctor: SomeConstructor) {
	return new ctor("hello");
}

function to_date(ctor: CallOrConstruct) {
	return new ctor(String(Date.now()));
}