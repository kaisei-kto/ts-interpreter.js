/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ClassBody} ast 
 */
module.exports = ast => {
	return `{ ${ast.body.map(o => require(`./${o.type}`)(o)).join('\n')} }`;
}