const { dirname } = require('node:path');
const { createContext, Script } = require('node:vm');

module.exports = (init) => {
	let handle_exception;
	require.extensions['.ts'] = function (module) {
		const code = init(module.id);

		var sandbox = {};

		for (let k of Object.getOwnPropertyNames(global)) sandbox[k] = global[k];
		const filename = `${module.id}.runtime`;
		sandbox.require = module.require.bind(module);
		Object.defineProperty(sandbox.require, 'cache', {
			get() {
				return require.cache;
			}
		});

		sandbox.exports = module.exports;
		sandbox.__filename = module.id;
		sandbox.__dirname = dirname(module.filename);
		sandbox.module = module;
		sandbox.global = global;
		sandbox.root = global;

		const context = createContext(sandbox);

		const script = new Script(code, {
			filename
		});

		try {
			return script.runInContext(context);
		} catch (e) {
			let object = typeof e === 'object' ? e : new Error(e);

			if (String(object?.stack.split('\n')[2]).indexOf('^') !== -1) {
				const stack = object.stack.split('\n');
				stack.splice(0, 3);

				while (stack[0] === '') {
					stack.shift();
				}

				if (stack[1].indexOf('.ts.runtime:') !== -1) {
					const lstack = stack[1];
					const index = lstack.indexOf('at ') + 3;
					const astack = lstack.split('');
					const fpart = astack.splice(0, index);
					const new_stack = `${fpart.join('')}runtime_compiler (${astack.join('')})`;
					stack[1] = new_stack;
				}

				const ename = stack[0]?.split(':')?.shift();
				if (ename in global) {
					try {
						object = new global[ename]();
					} catch (e) {
						object = new Error();
					}
				}
				object.message = stack[0].indexOf(': ') !== -1 ? stack[0].substr(stack[0].indexOf(': ') + 2) : undefined;
				object.stack = stack.join('\n');
			}

			handle_exception(object);
		}
	};

	handle_exception = require('./error_handler');
};