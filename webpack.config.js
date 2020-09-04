import path from 'path';

module.exports = {
  entry: "./components/simon.jsx",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      }
    ]
  },
};