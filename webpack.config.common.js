const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        less: './less/style.less',
        app: './jsx/index.jsx',
    },
    context: path.join(__dirname, 'src'),
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                enforce: 'pre',
                test: /.(js|jsx)$/,
                loader: 'eslint-loader',
                options: {
                    configFile: '.eslintrc',
                },
            },
            {
                test: /.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-0'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Contact Manager',
            inject: 'body',
            hash: true,
            chunks: ['less', 'app'],
        }),

        new webpack.ProvidePlugin({
            _: 'lodash',
            PropTypes: 'prop-types',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
