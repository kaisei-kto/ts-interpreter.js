const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ForStatement} ast 
 */
module.exports = ast => {
	let init = ast.init ? packages[ast.init.type](ast.init) : '';
	const test = ast.test ? packages[ast.test.type]((ast.test.parent = ast) && ast.test) : '';
	const update = ast.update ? packages[ast.update.type]((ast.update.parent = ast) && ast.update) : '';
	const body = packages[ast.body.type]((ast.body.parent = ast) && ast.body);

	init = (typeof init === 'object' ? (Array.isArray(init) ? init.at(0).declaration : init.declaration): init).replace(/;+/g, '');
	return (`for (${init}; ${test}; ${update}) ${body}`);
};