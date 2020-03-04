const presetEnv = require.resolve('@babel/preset-env');
const presetReact = require.resolve('@babel/preset-react');
const classPropPlugin = require.resolve('@babel/plugin-proposal-class-properties');
const webpack = require('webpack');

module.exports = (settings) => ({
    mode: "development",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [presetEnv, presetReact],
                        plugins: [classPropPlugin]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name(fileName) {
                                fileName = `resource/${fileName.slice(fileName.indexOf("/", 1) + 1)}`;
                                return fileName;
                            },
                            emitFile: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BASENAME: JSON.stringify(`/api/webapp/${settings.appId}/preview`)
        }),
    ]
});
