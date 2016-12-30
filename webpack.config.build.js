var path = require('path');

module.exports = {
    devtool: 'eval',
    entry: './src/index',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                loaders: ['babel'],
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                loaders: ['url-loader?limit=10000']
            }
        ]
    }
};
