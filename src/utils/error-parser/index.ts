const at = '    at ';
const runtime = '.runtime:';

function find_stack(stacks) {
	if (stacks[0]?.indexOf(process.cwd()) === 0 && stacks[0]?.indexOf(runtime) > 0) {
		return stacks[0];
	}

	for (const stack of stacks) {
		const start = stack.indexOf(at);
		const end = stack.indexOf(runtime);

		if (start === 0 && end > 0) {
			return stack.substr(at.length);
		}
	}
}

export function e_parser(e: Error) : {
	name?: string,
	message?: string,
	stack?: string,
	path?: string,
	raw: any,
	line: number,
	column: number
} {
	let o = {
		name: e?.constructor.name,
		message: e?.message,
		stack: e?.stack,
		path: undefined,
		raw: e,
		line: 0,
		column: 0
	}

	if (typeof o.stack === 'string') {
		const stack = find_stack(o.stack.split('\n'));
		if (typeof stack === 'string') {
			const start = stack.lastIndexOf(runtime)
			const end = Math.max(0, stack.lastIndexOf(')')) || undefined;

			if (start !== -1) {
				const [ line, column ] = stack.substring(start + runtime.length, end).split(':');
				o.line = Number(line);
				o.column = Number(column) || 1;

				if (stack.indexOf('(') !== -1) {
					o.path = stack.substring(stack.indexOf('(') + 1, start + runtime.length - 1);
				} else if (stack.indexOf(process.cwd()) === 0) {
					o.path = stack.substring(stack.indexOf('(') + 1, start + runtime.length - 1);
				}
			}
		}
	}

	return o;
}