#!/usr/bin/env node
'use strict';

exports.__esModule = true;
var child_process_1 = require("child_process");
var SUPPORTED_CONFIGS = [
    'webpack',
    'rollup',
];
function runConfigs(cli, configs) {
    if (cli === void 0) { cli = ''; }
    if (configs === void 0) { configs = []; }
    if (!cli || !configs.length) {
        console.error('cli or configs not given!');
        return false;
    }
    if (!SUPPORTED_CONFIGS.includes(cli)) {
        console.error('cli not supported yet');
        return false;
    }
    if (configs.some(function (config) { return !config.match(/[A-Za-z]+\.config\.js$/g); })) {
        console.error('one of the config files does not end with .config.js');
        return false;
    }
    console.group('config-runner-execution');
    var passed = true;
    for (var _i = 0, configs_1 = configs; _i < configs_1.length; _i++) {
        var config_1 = configs_1[_i];
        console.log("executing " + cli + " --config " + config_1);
        try {
            child_process_1.execSync("./node_modules/.bin/" + cli + " --config " + config_1, { stdio: 'inherit' });
        }
        catch (error) {
            passed = false;
            break;
        }
    }
    console.groupEnd();
    console.log('config-runner-execution finished');
    return passed;
}
console.group('config-runner');
var result = false;
if (!(process.argv.length >= 4)) {
    console.error('need cli and configs');
}
else {
    var _a = process.argv, cli = _a[2], configs = _a.slice(3);
    result = runConfigs(cli, configs);
}
console.groupEnd();
result ? console.log('config-runner succeeded!') : console.error('config-runner failed!');
