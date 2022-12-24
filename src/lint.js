const parser = require('@typescript-eslint/parser');
const eslint = require('eslint');

const linter = new eslint.Linter();
linter.defineParser('@typescript-eslint/parser', parser);
linter.defineRule('block-scoped-var', require('@mysticatea/eslint-plugin').rules['block-scoped-var']);
linter.defineRule('detect-no-assignment', require('eslint-plugin-detect-no-assignment').rules['detect-no-assignment']);

module.exports = function(src) {
	const result = linter.verify(src, {
		env: {
			browser: false,
			commonjs: true,
			es2021: true,
			node: true
		},
		extends: [ 'eslint:recommended' ],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			ecmaVersion: 2024,
			sourceType: 'module',
			ecmaFeatures: {
				impliedStrict: false
			}
		},
		noInlineConfig: true,
		rules: {
			'no-const-assign': 'error',
			'no-undef': 'error',
			'no-undef-init': 'error',
			'valid-typeof': 'error',
			'block-scoped-var': 'error',
			'detect-no-assignment': 'error'
		}
	});
	
	return result;
}