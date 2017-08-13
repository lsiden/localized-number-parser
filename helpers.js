export function dump(val, msg='') {
	const util = require('util')
	console.log((msg ? msg + ': ' : '') + util.inspect(val, {showHidden: false, depth: null}))
}
