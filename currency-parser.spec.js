// const CurrencyParser = require('../currency-parser')
import CurrencyParser from '../currency-parser'

describe('CurrencyParser', function() {
	beforeEach(function() {
	})

	it('parses currency values according to locale', function() {
		const parser = new CurrencyParser() // en-us
		expect(parser.parse('123,456.78')).toBe(123456.78)
		expect(parser.parse('123456.78')).toBe(123456.78)
		expect(parser.parse('123 456.78')).toBeUndefined()
	})

})