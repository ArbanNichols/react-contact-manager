const merge = require('webpack-merge');

const common = require('./webpack.config.common.js');

const dev = env => {
    return merge([
        {
            devtool: 'inline-source-map',
            mode: 'development',
            devServer: {
                hot: true,
                port: 3000,
                historyApiFallback: true,
            },
        },
    ]);
};

module.exports = env => {
    return merge(common(env), dev(env));
};
