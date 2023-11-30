module.exports = {
	cache: {},
	comments: [],
	packages: new Proxy({}, {
		get: (self, key) => {
			const f = Reflect.get(self, key);

			if (typeof f !== 'function') {
				throw `\x1b[4m${key}\x1b[0m is not supported on ts-interpreter.js ast list, please report this issue on \x1b[4mhttps://github.com/kaisei-kto/ts-interpreter.js/issues\x1b[0m`;
			}

			return f;
		}
	})
};