const path = require('path');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.config.common.js');

module.exports = webpackMerge(common, {
    devtool: 'source-map',

    mode: 'development',

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
    ],

    devServer: {
        contentBase: path.join(__dirname, "www"),
        port: 3000,
    },
});
