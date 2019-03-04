const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, './src');

module.exports = env => {
    const { PLATFORM } = env;
    return merge([
        {
            entry: ['@babel/polyfill', APP_DIR],
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        },
                    },
                    {
                        test: /\.(scss|css)$/,
                        use: [
                            PLATFORM === 'production'
                                ? MiniCssExtractPlugin.loader
                                : 'style-loader',
                            'css-loader',
                            'sass-loader',
                        ],
                    },
                ],
            },
            plugins: [
                new CopyWebpackPlugin([{ from: 'src/static' }]),
                new HtmlWebpackPlugin({
                    template: './src/index.html',
                    filename: './index.html',
                }),
                new webpack.DefinePlugin({
                    'process.env.PLATFORM': JSON.stringify(env.PLATFORM),
                }),
                new webpack.ProvidePlugin({
                    PropTypes: 'prop-types',
                }),
            ],
            resolve: {
                extensions: ['.js', '.jsx'],
            },
            stats: 'minimal',
        },
    ]);
};
