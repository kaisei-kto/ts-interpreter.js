const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ForStatement} ast 
 */
module.exports = ast => {
	const init = ast.init ? packages[ast.init.type](ast.init) : '';
	const test = ast.test ? packages[ast.test.type](ast.test) : '';
	const update = ast.update ? packages[ast.update.type](ast.update) : '';
	const body = packages[ast.body.type](ast.body);
	return (`for (${init}; ${test}; ${update}) ${body}`);
}