// ES6

export default class {
	constructor(locale='en-US') {
		const formatter = new Intl.NumberFormat(locale)
		const [digiSep, deciSep] = this.constructor._getSeparators(formatter)
		const partPat = `[0-9${digiSep}]*`
		this.formatter = formatter
		this.reNumber = new RegExp(`^\\s*(${partPat})(?:\\${deciSep}(${partPat})?)\\s*$`)
		// dump(this.reNumber, 'this.reNumber')
		this.reNumberDigiSep = new RegExp('\\' + digiSep, 'g')
	}

	parse(arg) {
		const m = this.reNumber.exec(arg)
		if (!m) {
			return undefined
		}
		const wholePart = m[1] ? m[1].replace(this.reNumberDigiSep, '') : '0'
		const fractionPart = m[2] ? m[2].replace(this.reNumberDigiSep, '') : '0'
		const val = Number(wholePart + '.' + fractionPart)
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

function getLocalLanguage() {
	if (isUndef(process) || isUndef(process.env) || isUndef(process.env.LANG)) {
		return 'en-US'
	}
	return process.env.LANG.split('.')[0].replace(/_/g, '-')
}

function polyFillMissingLocales() {
	if (Intl) {
		var areIntlLocalesSupported = require('intl-locales-supported');

		var localesMyAppSupports = [
		    'en-US',
		    'de', // for testing
		];
		var lang = getLocalLanguage()
		if (lang) {
			localesMyAppSupports.push(lang)
		}
	    // Determine if the built-in `Intl` has the locale data we need.
	    if (!areIntlLocalesSupported(localesMyAppSupports)) {
	        // `Intl` exists, but it doesn't have the data we need, so load the
	        // polyfill and patch the constructors we need with the polyfill's.
	        var IntlPolyfill    = require('intl');
	        Intl.NumberFormat   = IntlPolyfill.NumberFormat;
	        // Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
	    }
	} else {
	    // No `Intl`, so use and load the polyfill.
	    Intl = require('intl');
	}
}
polyFillMissingLocales()