module.exports = {
  devServer: { inline: true },
    entry: require('path').resolve(__dirname,'beta/main.ts'),
    output: {
        path:require('path').resolve(__dirname,'final/'),
        filename: 'main.js'
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.js','.ts']
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader:'ts-loader'/*'awesome-typescript-loader'*/ }
      ]
    }
  }