const path = require('path');
module.exports = {
    entry: {
        script: './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js']
    }
};