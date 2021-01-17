//webpack.config.dev.js
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const webpack = require('webpack');
const { escapeRegExp } = require('lodash');

console.log(merge);

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        port: 3000,
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: true, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true, //是否启用 gzip 压缩
        open: true,
        hot: true,
        proxy: {
            "/api": {
                target: "http://localhost:4000",
                pathRewrite: {
                    '/api': ''
                }
            }
        },
        before(app) {
            app.get('/user', (req, res) => {
                res.json({ name: '刘小夕' })
            })
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() //热更新插件
    ],

    //...其它的一些配置
});