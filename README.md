# nativescript-vue-ts-debugtest

Repo for testing debugging with:

- Nativescript
- Vue
- TypeScript
- Webpack

## Why?
In a large Nativescript project I have trouble getting the debugger to work. I seem to be not the only one, as I've found
many online articles, Stack Overflow questions and GitHub issues about:

- Breakpoint jumping when setting
- Source maps not correctly generated
- Webpack loaders not working properly

Next to that, it looks like debugging documentation from Nativescript is outdated. It proposes e.g. to use the TypeScript
plugin for NativeScript, but this is deprecated in favor of the TNS 6 bundle workflow. 

I really really really want step debugging, so I created a separate Nativescript project without my other project's full
code base to focus on getting this to work.

## What I'm able to do:

- Launch my app in debug mode from the shell and attach from VS Code
- Launch my app in debug mode from VS Code directly
- Set breakpoints
- Get application execution to halt on breakpoints in source .ts files *in my test project*

## What I'm not able to do:

- Get application execution to halt on breakpoints in source .vue files
- Get application execution to halt on breakpoints in source .ts files *in my big project*

## What have I done so far?

- Installed VS Code Nativescript extension
- Installed VS Code Chrome debugger extension
- Added debugger launch configuration

```
{
    "name": "Launch on Android",
    "type": "nativescript",
    "request": "launch",
    "platform": "android",
    "appRoot": "${workspaceRoot}",
    "sourceMaps": true,
    "watch": true,
    "sourceMapPathOverrides": {
        "webpack:///*": "${workspaceRoot}/app/*"
    },
    "tnsArgs": [
        "--bundle",   // Bundle the code
        "--no-hmr",   // I don't want HMR (yet) - at least not for debugging
        "--log=trace" // Print detailed diagnostic log for the execution of the current command
    ],
    // Enable verbose tracing of messages over Chrome debugging protocol - shows source mapping
    // results for breakpoint setting
    "trace": "verbose"
}

## Breakpoint setting in TypeScript file (successful)

```
Result when setting a breakpoint in /app/components/mixin.ts, line 4:

```
→ To target: "{\"id\":63,\"method\":\"Debugger.setBreakpointByUrl\",\"params\":{\"urlRegex\":\"file:\\\\/\\\\/\\\\/data\\\\/data\\\\/org\\\\.nativescript\\\\.debugtest\\\\/files\\\\/app\\\\/bundle\\\\.js\",\"lineNumber\":21,\"columnNumber\":17}}"
← From target: {"id":56,"result":{"locations":[]}}
→ To target: "{\"id\":64,\"method\":\"Debugger.setBreakpointByUrl\",\"params\":{\"urlRegex\":\"file:\\\\/\\\\/\\\\/data\\\\/data\\\\/org\\\\.nativescript\\\\.debugtest\\\\/files\\\\/app\\\\/bundle\\\\.js\",\"lineNumber\":21,\"columnNumber\":17}}"
← From target: {"id":57,"result":{"locations":[]}}
→ To target: "{\"id\":65,\"method\":\"Debugger.setBreakpointByUrl\",\"params\":{\"urlRegex\":\"file:\\\\/\\\\/\\\\/data\\\\/data\\\\/org\\\\.nativescript\\\\.debugtest\\\\/files\\\\/app\\\\/bundle\\\\.js\",\"lineNumber\":21,\"columnNumber\":17}}"
← From target: {"id":58,"result":{"locations":[]}}
→ To target: "{\"id\":66,\"method\":\"Debugger.setBreakpointByUrl\",\"params\":{\"urlRegex\":\"file:\\\\/\\\\/\\\\/data\\\\/data\\\\/org\\\\.nativescript\\\\.debugtest\\\\/files\\\\/app\\\\/bundle\\\\.js\",\"lineNumber\":21,\"columnNumber\":17}}"
← From target: {"id":59,"result":{"breakpointId":"2:319:12:file:\\/\\/\\/data\\/data\\/org\\.nativescript\\.debugtest\\/files\\/app\\/bundle\\.js","locations":[{"scriptId":"8","lineNumber":319,"columnNumber":12}]}}
← From target: {"id":60,"result":{"breakpointId":"2:21:17:file:\\/\\/\\/data\\/data\\/org\\.nativescript\\.debugtest\\/files\\/app\\/bundle\\.js","locations":[{"scriptId":"8","lineNumber":24,"columnNumber":6}]}}
← From target: {"error":{"code":-32000,"message":"Breakpoint at specified location already exists."},"id":61}
← From target: {"error":{"code":-32000,"message":"Breakpoint at specified location already exists."},"id":62}
← From target: {"error":{"code":-32000,"message":"Breakpoint at specified location already exists."},"id":63}
← From target: {"error":{"code":-32000,"message":"Breakpoint at specified location already exists."},"id":64}
← From target: {"error":{"code":-32000,"message":"Breakpoint at specified location already exists."},"id":65}
← From target: {"error":{"code":-32000,"message":"Breakpoint at specified location already exists."},"id":66}
SourceMaps.setBP: Mapped /Users/eric/GIT/nativescript-vue-ts-debugtest/platforms/android/app/src/main/assets/app/bundle.js:320:13 to /Users/eric/GIT/nativescript-vue-ts-debugtest/app/components/mixin.ts:4
To client: {"seq":0,"type":"response","request_seq":26,"command":"setBreakpoints","success":true,"body":{"breakpoints":[{"id":1000,"verified":true,"line":4,"column":13}]}}
To client: {"seq":0,"type":"event","event":"output","body":{"category":"telemetry","output":"ClientRequest/setBreakpoints","data":{"Versions.DebugAdapterCore":"6.7.46","successful":"true","timeTakenInMilliseconds":"273.095175","requestType":"request"}}}
```

Result of hitting the breakpoint during execution:

```
← From target: {"method":"Debugger.paused","params":{"callFrames":[{"callFrameId":"{\"ordinal\":0,\"injectedScriptId\":1}","functionName":"bar","functionLocation":{"scriptId":"8","lineNumber":318,"columnNumber":22},"location":{"scriptId":"8","lineNumber":319,"columnNumber":12},"url":"file:///data/data/org.nativescript.debugtest/files/app/bundle.js","scopeChain":[{"type":"local","object":{"type":"object","className":"Object","description":"Object","objectId":"{\"injectedScriptId\":1,\"id\":113}"},"name":"bar","startLocation":{"scriptId":"8","lineNumber":318,"columnNumber":22},"endLocation":{"scriptId":"8","lineNumber":320,"columnNumber":9}},{"type":"closure","object":{"type":"object","className":"Object","description":"Object","objectId":"{\"injectedScriptId\":1,\"id\":114}"},"name":"./components/mixin.ts","startLocation":{"scriptId":"8","lineNumber":311,"columnNumber":15},"endLocation":{"scriptId":"8","lineNumber":325,"columnNumber":7}},{"type":"global","object":{"type":"object","className":"NativeScriptGlobalObject","description":"NativeScriptGlobalObject","objectId":"{\"injectedScriptId\":1,\"id\":115}"}}],"this":{"type":"object","className":"VueComponent","description":"VueComponent","objectId":"{\"injectedScriptId\":1,\"id\":116}"}},{"callFrameId":"{\"ordinal\":1,\"injectedScriptId\":1}","functionName":"invokeWithErrorHandling","functionLocation":{"scriptId":"10","lineNumber":3794,"columnNumber":32},"location":{"scriptId":"10","lineNumber":3798,"columnNumber":25},"url":"f[...]
To client: {"seq":0,"type":"event","event":"stopped","body":{"reason":"breakpoint","threadId":1,"description":"Paused on breakpoint"}}
From client: threads(undefined)
To client: {"seq":0,"type":"response","request_seq":27,"command":"threads","success":true,"body":{"threads":[{"id":1,"name":"Thread 1"}]}}
To client: {"seq":0,"type":"event","event":"output","body":{"category":"telemetry","output":"ClientRequest/threads","data":{"Versions.DebugAdapterCore":"6.7.46","successful":"true","timeTakenInMilliseconds":"0.475667","requestType":"request"}}}
From client: stackTrace({"threadId":1,"startFrame":0,"levels":1})
To client: {"seq":0,"type":"response","request_seq":28,"command":"stackTrace","success":true,"body":{"stackFrames":[{"id":1000,"name":"bar","source":{"name":"mixin.ts","path":"/Users/eric/GIT/nativescript-vue-ts-debugtest/app/components/mixin.ts"},"line":4,"column":13}],"totalFrames":10}}
To client: {"seq":0,"type":"event","event":"output","body":{"category":"telemetry","output":"ClientRequest/stackTrace","data":{"Versions.DebugAdapterCore":"6.7.46","successful":"true","timeTakenInMilliseconds":"1.080449","requestType":"request"}}}
From client: stackTrace({"threadId":1,"startFrame":1,"levels":19})
To client: {"seq":0,"type":"response","request_seq":29,"command":"stackTrace","success":true,"body":{"stackFrames":[{"id":1011,"name":"invokeWithErrorHandling","source":{"name":"index.js","path":"/Users/eric/GIT/nativescript-vue-ts-debugtest/node_modules/nativescript-vue/dist/index.js"},"line":3364,"column":26},{"id":1012,"name":"invoker","source":{"name":"index.js","path":"/Users/eric/GIT/nativescript-vue-ts-debugtest/node_modules/nativescript-vue/dist/index.js"},"line":4030,"column":14},{"id":1013,"name":"_executeCallback","source":{"name":"gestures.android.js","path":"/Users/eric/GIT/nativescript-vue-ts-debugtest/node_modules/tns-core-modules/ui/gestures/gestures.android.js"},"line":307,"column":27},{"id":1014,"name":"TapAndDoubleTapGestureListenerImpl._handleSingleTap","source":{"name":"gestures.android.js","path":"/Users/eric/GIT/nativescript-vue-ts-debugtest/node_modules/tns-core-modules/ui/gestures/gestures.android.js"},"line":56,"column":21},{"id":1015,"name":"TapAndDoubleTapGestureListenerImpl.onSingleTapUp","source":{"name":"gestures.android.js","path":"/Users/eric/GIT/nativescript-vue-ts-debugtest/node_modules/tns-core-modules/ui/gestures/gestures.android.js"},"line":25,"column":18},{"id":1016,"name":"GesturesObserver.androidOnTouchEvent","source":{"name":"gestures.android.js","path":"/Users/eric/GIT/nativescript-vue-ts-debugtest/node_modules/tns-core-modules/ui/gestures/gestures.android.js"},"line":253,"column":41},{"id":1017,"name":"(anonymous function)","source"[...]
To client: {"seq":0,"type":"event","event":"output","body":{"category":"telemetry","output":"ClientRequest/stackTrace","data":{"Versions.DebugAdapterCore":"6.7.46","successful":"true","timeTakenInMilliseconds":"2.600462","requestType":"request"}}}
To client: {"seq":0,"type":"event","event":"output","body":{"category":"telemetry","output":"target/notification/onPaused","data":{"Versions.DebugAdapterCore":"6.7.46","aggregated.startTime":"[\"1570887715085\"]","aggregated.successful":"[\"true\"]","aggregated.timeTakenInMilliseconds":"[\"0.427983\"]"}}}
```

Visual proof:
![alt text](readme-images/breakpoint-hit-in-mixins-ts.png "Breakpoint hit in mixins.ts")


## Breakpoint setting in Vue file

```
From client: setBreakpoints({"source":{"name":"Home.vue","path":"/Users/eric/GIT/nativescript-vue-ts-debugtest/app/components/Home.vue"},"lines":[33],"breakpoints":[{"line":33}],"sourceModified":false})
To client: {"seq":0,"type":"event","event":"output","body":{"category":"telemetry","output":"setBreakpointsRequest","data":{"Versions.DebugAdapterCore":"6.7.46","fileExt":".vue"}}}
SourceMaps.setBP: Mapped /Users/eric/GIT/nativescript-vue-ts-debugtest/app/components/Home.vue to /Users/eric/GIT/nativescript-vue-ts-debugtest/platforms/android/app/src/main/assets/app/bundle.js
SourceMaps.setBP: Mapped /Users/eric/GIT/nativescript-vue-ts-debugtest/app/components/Home.vue:33:1 to /Users/eric/GIT/nativescript-vue-ts-debugtest/platforms/android/app/src/main/assets/app/bundle.js:22:18
Paths.setBP: Resolved /Users/eric/GIT/nativescript-vue-ts-debugtest/platforms/android/app/src/main/assets/app/bundle.js to file:///data/data/org.nativescript.debugtest/files/app/bundle.js
→ To target: "{\"id\":11,\"method\":\"Debugger.getPossibleBreakpoints\",\"params\":{\"start\":{\"scriptId\":\"8\",\"lineNumber\":21,\"columnNumber\":0},\"end\":{\"scriptId\":\"8\",\"lineNumber\":22,\"columnNumber\":0},\"restrictToFunction\":false}}"
← From target: {"id":11,"result":{"locations":[]}}
→ To target: "{\"id\":12,\"method\":\"Debugger.setBreakpointByUrl\",\"params\":{\"urlRegex\":\"file:\\\\/\\\\/\\\\/data\\\\/data\\\\/org\\\\.nativescript\\\\.debugtest\\\\/files\\\\/app\\\\/bundle\\\\.js\",\"lineNumber\":21,\"columnNumber\":17}}"
← From target: {"id":12,"result":{"breakpointId":"2:21:17:file:\\/\\/\\/data\\/data\\/org\\.nativescript\\.debugtest\\/files\\/app\\/bundle\\.js","locations":[{"scriptId":"8","lineNumber":24,"columnNumber":6}]}}
SourceMaps.setBP: Can't map /Users/eric/GIT/nativescript-vue-ts-debugtest/platforms/android/app/src/main/assets/app/bundle.js:25:7, keeping original line numbers.
To client: {"seq":0,"type":"response","request_seq":8,"command":"setBreakpoints","success":true,"body":{"breakpoints":[{"id":1000,"verified":true,"line":33}]}}
To client: {"seq":0,"type":"event","event":"output","body":{"category":"telemetry","output":"ClientRequest/setBreakpoints","data":{"Versions.DebugAdapterCore":"6.7.46","successful":"true","timeTakenInMilliseconds":"119.80421","requestType":"request"}}}
```

Note: states *can't map*

Result of trying to hit the breakpoint in execution:

```
← From target: {"method":"Log.entryAdded","params":{"entry":{"source":"javascript","level":"info","text":"'foo'","timestamp":1570888003184,"url":"file:///data/data/org.nativescript.debugtest/files/app/vendor.js","lineNumber":14496}}}
To client: {"seq":0,"type":"event","event":"output","body":{"category":"stdout","output":"'foo' [file:///data/data/org.nativescript.debugtest/files/app/vendor.js]\n"}}
'foo' [file:///data/data/org.nativescript.debugtest/files/app/vendor.js]
To client: {"seq":0,"type":"event","event":"output","body":{"category":"stdout","output":"'foo'\n","source":{"name":"index.js","path":"/Users/eric/GIT/nativescript-vue-ts-debugtest/node_modules/nativescript-vue/dist/index.js"},"line":14241,"column":5}}
'foo'
```
