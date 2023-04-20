import * as esbuild from "esbuild";
import * as fs from "fs";

const fileName = 'whiteboard-bridge';
await esbuild.build({
  entryPoints: ["./src/index.tsx"],
  bundle: true,
  outfile: `./build/${fileName}.js`,
  target: ['es6'],
  logLevel: 'info',
  define: {
    'process.env.NODE_ENV': JSON.stringify("production"),
    'process.env.DEBUG': 'false',
  },
  minifyWhitespace: true,
  minifyIdentifiers: true
});

const htmlTemp = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>white-sdk-bridge Application</title>
    <link rel="stylesheet" href="${fileName}.css">
</head>

<body>
    <div id="root"></div>
    <script src='${fileName}.js'></script>
</body>

</html>
`.trimStart();

fs.writeFileSync('./build/index.html', htmlTemp);