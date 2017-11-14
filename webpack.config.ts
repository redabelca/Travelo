module.exports = {
    entry: require('path').resolve(__dirname,'beta/js/main.ts'),
    output: {
        path:require('path').resolve(__dirname,'final/js'),
        filename: 'main.js'
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    }
  }