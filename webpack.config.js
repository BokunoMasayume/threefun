const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './firstmodel.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, './dist')
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    },
    devServer: {
        contentBase:'.',
        port: 8888,
        hot: true,
    },
    mode: "development",
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Caching',
          filename: '../warmup.html'
        }),
      ],
}