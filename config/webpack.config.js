const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const tailwindcss = require("tailwindcss");
// const autoprefixer = require("autoprefixer");

const path = require('path');

devtoolOptions = {
    DO_NOT_USE_EVAL_IN_BUILD: 'false',
}

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js',
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].build.js'
    },
    devtool: devtoolOptions.DO_NOT_USE_EVAL_IN_BUILD,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js',
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'images',
                    esModule: false
                },
            }
        ]
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, '../src/components'),
        },
        extensions: ['.vue', '.js'],
    },
    plugins: [
        new VueLoaderPlugin(),
        new ManifestPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'injected',
            // minify: {
            //     collapseWhitespace: true,
            // },
            hash: true,
            template: './src/index.html',
        }),

        new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' })
    ],
    devServer: {
        host: 'localhost',
        contentBase: "./dist",
        hot: true,
        port: 5000,
    },
}