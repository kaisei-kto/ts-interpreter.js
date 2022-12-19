function js_docs(props) {
	const docs = [ '/**' ]
	for (const [key, value, name] of props) {
		docs.push(` * @${key}${value !== undefined ? ` {${value}}` : ''}${name ? ' ' + name : ''}`)
	}

	docs.push(' */')

	return docs.join('\n')
}

module.exports = { js_docs }