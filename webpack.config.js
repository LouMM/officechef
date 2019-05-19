import { resolve as _resolve } from "path";
import html_webpack_plugin from "html-webpack-plugin";

const htmlPlugin = new html_webpack_plugin({
    template: "./src/index.html",
    filename: "./index.html",
    inject: false
});

const config = {
    target: "electron-main",
    devtool: "source-map",
    entry: "./src/main.ts",
    output: {
        filename: "main.js",
        path: _resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [htmlPlugin]
};

export default (env, argv) => {
    return config;
};