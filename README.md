# Flat 白板重打包脚本

对于 Native 工程，你可以通过这样的形式来执行：

```shell
curl -sSL https://raw.githubusercontent.com/netless-io/flat-native-bridge/main/bridge.sh | sh -s DIR_TO_BRIDGERESOURCE
```

上述代码会拉取 DIR_TO_BRIDGERESOURCE 中对应的 Git SHA，并且将所需依赖打包完成。

处理完成之后，你会在本地的 ./build 目录下得到打包后的工程内容。

打包完成之后，你可以在 ./build/SHA 文件内确认一下注入的依赖是否正确。

具体流程如下：

1. 从 https://github.com/netless-io/Whiteboard-bridge 下载代码。需要指定原始 Resource 目录，用于查询 sha 并前往 Github 下载未打包内容。
2. 下载后在本地解压并进入该目录。
3. 循环 apps 变量。执行 yarn add item 在 bridge 工程中添加所需依赖。
4. 执行 yarn buildWithoutGitHash 完成打包。
5. 写入本次的注入信息到 ./build/$SHA 文件内。
6. 清理临时信息。

### 如何更新依赖版本

更新 `bridge.sh`  文件里的 `apps` 变量

如果同时有 注入信息和打包信息需要修改，请前往 `injectCode.ts` 或者 `webpack.config.flat.js` 中修改

### 注意

重新生成 webpack.config.flat.js 主要是解决 esm 打包的问题。

### 依赖

wget (brew install wget)
