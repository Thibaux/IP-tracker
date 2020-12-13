const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')


module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js'
    },
    // devtool: 'source-maps',
    module: {
        rules: [{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            // { test: /\.css$/, loader: ['style-loader', 'css-loader'] }
            {
                test: /\.s(a|c)cc$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
        ]
    },
    devServer: {
        contentBase: 'src',
        hot: true,
        open: true,
        port: 8080,
        watchContentBase: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new Dotenv()
    ]
}