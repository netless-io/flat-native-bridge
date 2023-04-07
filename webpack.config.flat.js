const fc = require("./webpack.config.js");

module.exports = (env, argv) => {
    const config = fc(env, argv);
    config.resolve.alias = {
        ...config.resolve.alias,
        "@netless/app-selector": require.resolve("@netless/app-selector"),
        "@netless/app-quill": require.resolve("@netless/app-quill"),
        "yjs": require.resolve("yjs"),
    }
    return config;
}