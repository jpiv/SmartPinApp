#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.jpiv.flexr/host.exp.exponent.MainActivity
