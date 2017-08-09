// ES6

// if (global.Intl) {
// 	var areIntlLocalesSupported = require('intl-locales-supported');
// 	var localesMyAppSupports = [
// 	    'en-US',
// 	];
//     // Determine if the built-in `Intl` has the locale data we need.
//     if (!areIntlLocalesSupported(localesMyAppSupports)) {
//         // `Intl` exists, but it doesn't have the data we need, so load the
//         // polyfill and patch the constructors we need with the polyfill's.
//         var IntlPolyfill    = require('intl');
//         Intl.NumberFormat   = IntlPolyfill.NumberFormat;
//         Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
//     }
// } else {
//     // No `Intl`, so use and load the polyfill.
//     global.Intl = require('intl');
// }

export default class {
	constructor(locale='en-US') {
		const formatter = new global.Intl.NumberFormat(locale)
		const seps = this.constructor._getSeparators(formatter)
		this.formatter = formatter
		this.digiSep = seps[0]
		this.deciSep = seps[1]
	}

	parse(arg) {
		const rePart = `[0-9${this.digiSep}]*`
		const re = new RegExp(`^\s*(${rePart})(?:\\${this.deciSep}(${rePart})?)\s*$`)
		dump(re, 're')
		const reDigiSep = new RegExp(this.digiSep, 'g')
		const m = re.exec(arg)
		if (!m) {
			return undefined
		}
		const wholePart = m[1] ? m[1].replace(reDigiSep, '') : '0'
		const fractionPart = m[2] ? m[2].replace(reDigiSep, '') : '0'
		const val = Number(wholePart + this.deciSep + fractionPart)
		return isNaN(val) ? undefined : val
	}

	static _getSeparators(formatter) {
		const num = formatter.format(123456.78)
		const match = /123(.)456(.)78/.exec(num)
		return match.slice(1)
	}
}

function isUndef(val) {
	return typeof val === 'undefined'
}

function dump(val, msg='') {
	const util = require('util')
	console.log((msg ? msg + ': ' : '') + util.inspect(val, {showHidden: false, depth: null}))
}