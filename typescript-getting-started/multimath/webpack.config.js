const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./app/app.ts",
  output: {
    path: path.resolve(__dirname, "dist"), // needs to be absolute
    filename: "bundle.js",
  },
  devServer: {
    open: true,
    host: "localhost",
    static: {
      directory: path.resolve(__dirname, "src"),
      watch: true,
    },
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      cache: false,
    }),
  ],
  devtool: "inline-source-map",
};
