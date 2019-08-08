const path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
    },
    mode: "development",
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: ["files/**/*.js", "node_modules"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
        host:'192.168.2.13'
    }
};
