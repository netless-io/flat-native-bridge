#!/bin/sh

for file in $1/*
do
    if [ -f $file ]; then
        # Get file name
        filename=$(basename -- "$file")
        if [[ $filename != *.* ]]
        then
            SHA=$filename
        fi
    fi
done

# If SHA empty then exit
if [ -z "$SHA" ]
then
    echo "SHA is empty"
    exit 1
fi

echo "SHA is $SHA"

ZIPNAME="src.zip"
DIRNAME="Whiteboard-bridge-$SHA"
TMP_DIR="Whiteboard-bridge-$SHA-tmp"
INJECT_CODE_NAME="injectCode.ts"
INJECT_CODE_PATH="$TMP_DIR/$INJECT_CODE_NAME"
WEBPACK_CONFIG_NAME="webpack.config.flat.js"
WEBPACK_CONFIG_PATH="$TMP_DIR/$WEBPACK_CONFIG_NAME"

# Download
mkdir $TMP_DIR
wget -O $INJECT_CODE_PATH https://raw.githubusercontent.com/netless-io/flat-native-bridge/main/injectCode.ts
wget -O $WEBPACK_CONFIG_PATH https://raw.githubusercontent.com/netless-io/flat-native-bridge/main/webpack.config.flat.js
wget -O $ZIPNAME https://github.com/netless-io/whiteboard-bridge/archive/$SHA.zip
unzip $ZIPNAME

cp $INJECT_CODE_PATH ./Whiteboard-bridge-$SHA/src/$INJECT_CODE_NAME
cp $WEBPACK_CONFIG_PATH ./Whiteboard-bridge-$SHA/$WEBPACK_CONFIG_NAME

echo "import \"./injectCode\";\n$(cat ./Whiteboard-bridge-$SHA/src/index.tsx)" > ./Whiteboard-bridge-$SHA/src/index.tsx

# Build
cd $DIRNAME

apps=(
    "@netless/app-countdown@0.0.7"
    "@netless/app-dice@0.1.1"
    "@netless/app-geogebra@0.0.6"
    "@netless/app-iframe-bridge@0.0.2"
    "@netless/app-mindmap@0.1.1"
    "@netless/app-monaco@0.2.0-canary.1"
    "@netless/app-quill@0.1.1"
    "@netless/app-selector@0.0.3"
)

for item in ${apps[@]}
do
    yarn add $item
done

yarn buildWithoutGitHash --config ./webpack.config.flat.js

touch ./build/$SHA
echo "here are what injected into build" >> ./build/$SHA
for item in ${apps[@]}
do
    echo $item >> ./build/$SHA
done

mv ./build ..

cd ..
rm -rf $DIRNAME
rm -rf $ZIPNAME
rm -rf $TMP_DIR