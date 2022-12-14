const path = require('path');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const MiniCssExtractPLugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/index.js',
    output: {
        // el directorio del proyecto | nombre de salida
        path: path.resolve(__dirname, 'dist'),
        // nombre del bundle
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/fonts/[hash][ext][query]'
    },
    mode: 'development',
    // disabled while dev server is istalled => watch: true,
    devtool: 'source-map',
    resolve: {
        extensions: [
            '.js'
        ],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [
                    MiniCssExtractPLugin.loader,
                    "css-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.png$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPLugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPLugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 4200,
        open: true
    }
}