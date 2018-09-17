const path = require("path");
const url = require("url");

const handleArgs = (filePath, fileLink, options) => {
    let useBaseDir = false;

    if (options == null) {
        [fileLink, options] = [filePath, fileLink];
        const parsedFileLink = url.parse(fileLink);
        const fileName = path.basename(parsedFileLink.pathname);
        useBaseDir = true;
        filePath = fileName.replace(/%20/g, ' ');
    }

    return { filePath, fileLink, options, useBaseDir };
};

module.exports = handleArgs;
