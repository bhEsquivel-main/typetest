const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { env } = require('process');
const isDev = process.env.NODE_ENV !== 'production';

const config = {
    mode: isDev ? 'development' : 'production',
    entry: './games/'+process.env.GAME+'/src/appbase.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',

        
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    performance : {
        hints : false
    },        
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: './games/'+process.env.GAME+'/index.html' },
            { from: 'css/style.css', to: 'css/' },
            { from: './games/'+process.env.GAME+'/assets', to: 'assets' }
        ]),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase:  path.resolve(__dirname, '/games/'+process.env.GAME, 'dist'),
        host: 'localhost',
        port: '3005',
        compress: true,
    },
    optimization: {
        minimize: !isDev
      }
};

module.exports = config;