#!/usr/bin/env node
'use strict';

exports.__esModule = true;
var fs = require("fs");
var child_process_1 = require("child_process");
var SUPPORTED_CONFIGS = [
    'webpack',
    'rollup',
];
function findConfigs() {
    try {
        fs.accessSync('./configs');
        return fs.readdirSync('./configs');
    }
    catch (error) {
        console.error("could not read configs directory: " + error);
        return [];
    }
}
function runConfigs(cli, configs) {
    if (cli === void 0) { cli = ''; }
    if (configs === void 0) { configs = []; }
    if (!cli) {
        console.error('cli not given');
        return false;
    }
    if (!SUPPORTED_CONFIGS.includes(cli)) {
        console.error('cli not supported yet');
        return false;
    }
    if (!configs.length) {
        configs = findConfigs().map(function (config) { return "./configs/" + config; });
        if (!configs.length)
            return false;
    }
    console.log({ configs: configs, val: "after" });
    if (configs.some(function (config) { return !config.match(/[A-Za-z]+\.config\.js$/g); })) {
        console.error('one of the config files does not end with .config.js');
        return false;
    }
    console.group('config-runner-execution');
    var passed = true;
    for (var _i = 0, configs_1 = configs; _i < configs_1.length; _i++) {
        var config = configs_1[_i];
        console.log("executing " + cli + " --config " + config);
        try {
            child_process_1.execSync("./node_modules/.bin/" + cli + " --config " + config, { stdio: 'inherit' });
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
if (!(process.argv.length >= 3)) {
    console.error('need cli');
}
else {
    var _a = process.argv, cli = _a[2], configs = _a.slice(3);
    result = runConfigs(cli, configs);
}
console.groupEnd();
result ? console.log('config-runner succeeded!') : console.error('config-runner failed!');
