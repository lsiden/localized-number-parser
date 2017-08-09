// const NumberParser = require('../number-parser')
import NumberParser from 'number-parser'

describe('NumberParser', function() {
	beforeEach(function() {
	})

	it('returns undefined for malformed numbers', function() {
		const parser = new NumberParser('en-US')
		expect(parser.parse('foo')).toBeUndefined()
		expect(parser.parse('123foo')).toBeUndefined()
		expect(parser.parse('123 456.78')).toBeUndefined()
	})

	it('parses numeric values in en-US locale', function() {
		const parser = new NumberParser('en-US')
		expect(parser.parse('123,456.78')).toBe(123456.78)
		expect(parser.parse('123456.78')).toBe(123456.78)
	})

	it('parses numeric values in de (German) locale', function() {
		const parser = new NumberParser('de')
		expect(parser.parse('123.456,78')).toBe(123456.78)
	})

	it('ignores leading and trailing whitespace', function() {
		const parser = new NumberParser('en-US')
		expect(parser.parse(' 123,456.78 ')).toBe(123456.78)
	})

})