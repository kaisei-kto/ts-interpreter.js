function addAndPrint(n1: number, n2: number, cb: (num: number) => void) {
	const result = n1 + n2;
	cb(result);
}

addAndPrint(5, 10, (result) => {
	console.log(result);
});
