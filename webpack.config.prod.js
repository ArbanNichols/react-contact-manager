const path = require('path');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.config.common.js');

module.exports = webpackMerge(common, {
    mode: 'production',

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js',
    },

    plugins: [
        new ExtractTextPlugin('[name].[hash].css'),
    ],
});
