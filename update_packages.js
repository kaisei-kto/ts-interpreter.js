const { execSync } = require('child_process');
const package = require('./package.json')
execSync(`npm i ${Object.keys(package.dependencies).join(' ')} --save`, {
	encoding: 'utf8',
	shell: true,
	stdio: 'inherit'
})

execSync(`npm i ${Object.keys(package.devDependencies).join(' ')} --save-dev`, {
	encoding: 'utf8',
	shell: true,
	stdio: 'inherit'
})
