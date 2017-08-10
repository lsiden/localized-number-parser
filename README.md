# NumberParser

Parse numbers in a given locale,
honoring decimal and digit separators.

## Description

In the United States, it is the custom to write numbers as "123,456.78",
but in Germany, that would be written as "123.456,78".

## Example

const parser = new NumberParser('de')
parser.parse('123.456,78') // 123456.78

## Author

Lawrence Siden  
Ann Arbor, MI  
lsiden@gmail.com

## License

MIT
