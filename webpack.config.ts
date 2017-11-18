const { CheckerPlugin } = require('awesome-typescript-loader');
module.exports = {
    entry: require('path').resolve(__dirname,'beta/js/main.ts'),
    output: {
        path:require('path').resolve(__dirname,'final/js'),
        filename: 'main.js'
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.ts']
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.ts?$/, loader:'awesome-typescript-loader' /*'ts-loader'*/ }
      ]
    },
    plugins:[
      new CheckerPlugin()
    ]
  }