const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup.jsx",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup.html",
      filename: "popup.html",
    }),

    new copyPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
  resolve: {
    extensions: [".jsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};
