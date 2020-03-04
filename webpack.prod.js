const presetEnv = require.resolve('@babel/preset-env');
const presetReact = require.resolve('@babel/preset-react');
const classPropPlugin = require.resolve('@babel/plugin-proposal-class-properties');
const webpack = require('webpack');

module.exports = (settings) => ({
    mode: "production",
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
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name(fileName) {
                                fileName = `./${settings.appName}/res/${fileName.slice(fileName.indexOf("/", 1) + 1)}`;
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
            BASENAME: JSON.stringify(`/webapp/${settings.appName}`)
        }),
    ]
});
