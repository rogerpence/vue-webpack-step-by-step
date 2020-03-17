const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

devtoolOptions = {
    DO_NOT_USE_EVAL_IN_BUILD: 'false',
}

const cssLoaders =  [
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
];

const imageWebpackLoaderOptions = {
    mozjpeg: {
        progressive: true,
        quality: 65
    },
    // optipng.enabled: false will disable optipng
    optipng: {
        enabled: false
    },
    pngquant: {
        quality: [0.75, 0.90],
        speed: 10
    },
    gifsicle: {
        interlaced: false,
    },
    // the webp option will enable WEBP
    webp: {
        quality: 75
    }
};

const fileLoaderOptions = {
    name: '[name].[hash].[ext]',
    outputPath: 'images',
    esModule: false
};

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
                use: cssLoaders
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: fileLoaderOptions,
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: imageWebpackLoaderOptions,
                    }
                ]
            },
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