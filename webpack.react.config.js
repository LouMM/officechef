const path = require("path");
const html_webpack_plugin = require("html-webpack-plugin");

const htmlPlugin = new html_webpack_plugin({
    template: "./src/index.html",
    filename: "./index.html",
    inject: false
});

const config = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    target: "electron-renderer",
    devtool: "source-map-loader",
    entry: "./src/app/renderer.tsx",
    output: {
        filename: "renderer.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
              enforce: 'pre',
              test: /\.js$/,
              loader: 'source-map-loader'
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    // inform node to provide us with variable __dirname and __filename inside the compiled file.
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [htmlPlugin]
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    ,externals: {
        "react" : "React",
        "react-dom": "ReactDOM"
    }
};

module.exports = (env, argv) => {
    return config;
};