// webapck.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
const path = require('path');


module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), //必须是绝对路径
        filename: '[name].[hash:6].js',
        publicPath: '/' //通常是CDN地址
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ // 排除 node_modules 目录
            },
            {
                test: /\.(c|le)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hmr: isDev,
                            // reloadAll: true
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        esModule: false,
                        name: '[name]_[hash:6].[ext]',
                        outputPath: 'assets'
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /.html$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        //数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            config: config.template,
            chunks: ['index']
                // hash: true //是否加上hash，默认是 false
        }),
        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.html', //打包后的文件名
            config: config.template,
            chunks: ['login']
                // hash: true //是否加上hash，默认是 false
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true,
                // ignore: ['other.js'],
                globOptions: {
                    // ignore: ['**/other.js']
                }
            }],
            options: {}
        }),
        // new webpack.ProvidePlugin({
        //     React: 'react',
        //     Component: ['react', 'Component'],
        //     Vue: ['vue/dist/vue.esm.js', 'default'],
        //     $: 'jquery',
        //     _map: ['lodash', 'map']
        // })
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' //个人习惯将css文件放在单独目录下
        }),
        new OptimizeCssPlugin()
    ],

    devtool: 'cheap-module-eval-source-map',
    resolve: {
        modules: ['./src/components', 'node_modules'] //从左到右依次查找
    }
}