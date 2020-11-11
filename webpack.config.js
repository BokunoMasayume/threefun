const path = require('path');

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
    
}