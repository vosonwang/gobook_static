const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer){});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        proxy: {
            /*TODO 修改配置文件需要重启server才会有效*/
            '/tokens': {
                target: 'http://localhost:8300',
                changeOrigin: true
            },
            '/articles': {
                target: 'http://localhost:8300',
                changeOrigin: true
            },
            '/images': {
                target: 'http://localhost:8300',
                changeOrigin: true
            },
            '/files': {
                target: 'http://localhost:8300',
                changeOrigin: true
            },
            '/nodes': {
                target: 'http://localhost:8300',
                changeOrigin: true
            },
            '/admin/nodes': {
                target: 'http://localhost:8300',
                changeOrigin: true
            },
        }
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.ejs',
            // favicon: '',
            inject: false
        })
    ]
});