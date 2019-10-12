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
```

