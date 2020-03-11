const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

const DO_NOT_USE_EVAL_IN_BUILD = 'false';

module.exports = {    
    mode: 'development',
    entry: {
        main: './src/app.js',
    },        
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].build.js'
    },        
    devtool: DO_NOT_USE_EVAL_IN_BUILD,
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
            },
         ]
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, '../src/components'),
        },
        extensions: ['.vue'],
    },
    plugins: [
        new VueLoaderPlugin(),        
    ],
    devServer: {
        host: 'localhost',
        contentBase: "./dist",
        hot: true,
        port: 8080,
    },   
}