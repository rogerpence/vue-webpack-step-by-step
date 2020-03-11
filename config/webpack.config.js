const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js',
    },        
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].build.js'
    },        
    devtool: 'false',
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }, ]
    },
    plugins: [
        new VueLoaderPlugin(),        
    ]
}