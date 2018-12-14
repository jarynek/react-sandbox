const fs = require('fs');
const json = JSON.parse(fs.readFileSync('./package.json'));

module.exports = {
    mode: 'development',
    watch: true,
    entry: json.entry.js,
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ]
    }
};