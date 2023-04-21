const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const racine = __dirname + require('path').sep;

module.exports = {
  name: "routin",
  mode: "production",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".ts", ".scss"],
    modules: ["./node_modules/"]
  },
  module: {
    rules: [
      { 
        test: /\.ts$/,
        use: "ts-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "sass-loader",
            options: {
              warnRuleAsWarning: true,
              sourceMap: false,
              sassOptions: {
                outputStyle: "compressed",
                includePaths: [racine + "src"]
              }
            }
          }
        ],
        exclude: "/node_modules/"
      },
      {
        test: /\.(png|jpg|svg)$/i,
        type: "asset/resource"
      },
      {
        test: /\.html$/,
        use: "html-loader",
        exclude: "/node_modules/"
      }
    ]
  },
  output: {
    path: racine + "dist",
    filename: "routin.js",
    assetModuleFilename: "img/[hash][ext][query]",
    clean: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "routin.css"
    }),
    new HtmlWebpackPlugin({
      template: racine + "src/html/index.html"
    })
  ]
}
