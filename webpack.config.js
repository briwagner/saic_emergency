module.exports = {
  entry: './app.js',
  output: {
    filename: 'out-bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader:'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
}