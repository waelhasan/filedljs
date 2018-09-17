const shell = require('shelljs');
const path = require("path");
const fs = require('fs');

const handlePathCreation = (filePath, createPathIfNotExist) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        if (createPathIfNotExist) shell.mkdir('-p', dir);
        else throw new Error('Specified path does not exist, try setting createPathIfNotExist option to true to auto create it.')
    }
};

module.exports = handlePathCreation;
