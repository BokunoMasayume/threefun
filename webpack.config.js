const path = require('path');

module.exports = {
    entry: './firstmodel.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    },
    mode: "development",
    
}