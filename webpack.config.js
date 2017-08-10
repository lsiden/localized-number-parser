var path = require('path');

module.exports = {
    entry: './localized-number-parser.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'localized-number-parser.bundle.js',
    },
    devtool: 'inline-source-map',
    // debug: true,
};