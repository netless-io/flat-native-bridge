import geogebra from "@netless/app-geogebra";
import appMonaco from "@netless/app-monaco";
import { WindowManager } from '@netless/window-manager';
import appCountdown from "@netless/app-countdown";
import appSelector from "@netless/app-selector";
import appDice from "@netless/app-dice";
import appMindmap from "@netless/app-mindmap";
import appQuill from "@netless/app-quill";
import appIframeBridge from "@netless/app-iframe-bridge";

WindowManager.register({
  kind: "GeoGebra",
  src: geogebra,
  appOptions: {
    // TODO: replace it with non-country specific url
    HTML5Codebase:
      "https://flat-storage-cn-hz.whiteboard.agora.io/GeoGebra/HTML5/5.0/web3d",
  },
});

WindowManager.register({
  kind: "Monaco",
  appOptions: {
    loader: {
      paths: {
        vs: "https://flat-storage.oss-cn-hangzhou.aliyuncs.com/flat-resources/library/monaco-editor@0.27.0/min/vs",
      },
    },
  },
  src: appMonaco,
});

WindowManager.register({
  kind: "Countdown",
  src: appCountdown,
});

WindowManager.register({
  kind: "Selector",
  src: appSelector,
});

WindowManager.register({
  kind: "Dice",
  src: appDice,
});

WindowManager.register({
  kind: "MindMap",
  src: appMindmap,
});

WindowManager.register({
  kind: "Quill",
  src: appQuill,
});

WindowManager.register({
  kind: "IframeBridge",
  src: appIframeBridge,
});
