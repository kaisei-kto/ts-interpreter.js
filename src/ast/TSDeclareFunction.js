const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSDeclareFunction} ast 
 */
module.exports = ast => {
	return `/**\n* @TODO {TSDeclareFunction}\n*/`;
};