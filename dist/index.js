'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ES6

var _class = function () {
	function _class() {
		var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en-US';

		_classCallCheck(this, _class);

		var formatter = new Intl.NumberFormat(locale);

		var _constructor$_getSepa = this.constructor._getSeparators(formatter),
		    _constructor$_getSepa2 = _slicedToArray(_constructor$_getSepa, 2),
		    digiSep = _constructor$_getSepa2[0],
		    deciSep = _constructor$_getSepa2[1];

		var partPat = '[0-9' + digiSep + ']*';
		this.formatter = formatter;
		this.reNumber = new RegExp('^\\s*(' + partPat + ')(?:\\' + deciSep + '(' + partPat + '))?\\s*$');
		// dump(this.reNumber, 'this.reNumber')
		this.reNumberDigiSep = new RegExp('\\' + digiSep, 'g');
	}

	_createClass(_class, [{
		key: 'parse',
		value: function parse(arg) {
			var m = this.reNumber.exec(arg);
			if (!m) {
				return undefined;
			}
			var wholePart = m[1] ? m[1].replace(this.reNumberDigiSep, '') : '';
			var fractionPart = m[2] ? m[2].replace(this.reNumberDigiSep, '') : '';
			// dump(wholePart, 'wholePart')
			// dump(fractionPart, 'fractionPart')
			var val = Number(wholePart + '.' + fractionPart);
			return isNaN(val) ? undefined : val;
		}
	}], [{
		key: '_getSeparators',
		value: function _getSeparators(formatter) {
			var num = formatter.format(123456.78);
			var match = /123(.)456(.)78/.exec(num);
			return match.slice(1);
		}
	}]);

	return _class;
}();

exports.default = _class;


function isUndef(val) {
	return typeof val === 'undefined';
}

function dump(val) {
	var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	var util = require('util');
	console.log((msg ? msg + ': ' : '') + util.inspect(val, { showHidden: false, depth: null }));
}

function getLocalLanguage() {
	if (isUndef(process) || isUndef(process.env) || isUndef(process.env.LANG)) {
		return 'en-US';
	}
	return process.env.LANG.split('.')[0].replace(/_/g, '-');
}

function polyFillMissingLocales() {
	if (Intl) {
		var areIntlLocalesSupported = require('intl-locales-supported');

		var localesMyAppSupports = ['en-US', 'de'];
		var lang = getLocalLanguage();
		if (lang) {
			localesMyAppSupports.push(lang);
		}
		// Determine if the built-in `Intl` has the locale data we need.
		if (!areIntlLocalesSupported(localesMyAppSupports)) {
			// `Intl` exists, but it doesn't have the data we need, so load the
			// polyfill and patch the constructors we need with the polyfill's.
			var IntlPolyfill = require('intl');
			Intl.NumberFormat = IntlPolyfill.NumberFormat;
			// Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
		}
	} else {
		// No `Intl`, so use and load the polyfill.
		Intl = require('intl');
	}
}
polyFillMissingLocales();
