/**
 * @typedef SomeConstructor
 * @type {{ new(s: string) }}
 */
/**
 * @interface
 * @typedef CallOrConstruct
 * @type {object}
 * @n {e} w
 * @unknown TSCallSignatureDeclaration
 */
/**
 * @param {SomeConstructor} ctor
 */
function fn(ctor) {
	return new ctor('hello');
}
/**
 * @param {CallOrConstruct} ctor
 */
function to_date(ctor) {
	return new ctor(String(Date.now()));
}
