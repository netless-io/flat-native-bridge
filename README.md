Flat 白板重打包脚本。

使用方式

```shell
sh bridge.sh DIR_TO_BRIDGERESOURCE
```

其中 DIR_TO_BRIDGERESOURCE 是原始 Resource 目录，用于查询 sha 并前往 Github 下载未打包内容。

处理完成之后，你会在本地的 ./build 目录下得到打包后的工程内容。

流程如下：

1. 从 https://github.com/netless-io/Whiteboard-bridge 下载代码。需要指定原始 Resource 目录，用于查询 sha 并前往 Github 下载未打包内容。
2. 下载后在本地解压并进入该目录。
3. 循环 apps 变量。执行 yarn add item 在 bridge 工程中添加所需依赖。
4. 执行 yarn buildWithoutGitHash 完成打包。
5. 写入本次的注入信息到 ./build/$SHA 文件内。
6. 清理临时信息。
