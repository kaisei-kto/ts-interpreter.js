/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").SwitchCase} ast 
 */
module.exports = ast => {
	return `${ast.test ? `case ${require(`./${ast.test.type}`)(ast.test)}` : 'default'}:\n${ast.consequent.map(o => require(`./${o.type}`)(o)).join('\n')}`
}