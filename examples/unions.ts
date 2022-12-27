function start(
	arg: string | string[] | (() => string) | { s: string }
): string {
	// this is super common in JavaScript
	if (typeof arg === "string") {
		return commonCase(arg);
	} else if (Array.isArray(arg)) {
		return arg.map(commonCase).join(",");
	} else if (typeof arg === "function") {
		return commonCase(arg());
	} else {
		return commonCase(arg.s);
	}

	function commonCase(s: string): string {
		// finally, just convert a string to another string
		return s;
	}
}