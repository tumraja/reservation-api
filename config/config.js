"use strict";
exports.__esModule = true;
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
exports.config = function () {
    try {
        return yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'enviroment.yaml')));
    }
    catch (e) {
        console.log('error reading yaml file: ', e);
    }
};
