const handleArgs = require('./handleArgs');
const download = require('./download');

const defaultOptions = {
    baseDir: '.',
    createPathIfNotExist: true,
    downloadHaltMaxTime: 1 * 60 * 1000,
    onProgress: function () { },
    deleteIfLessSize: true,
    maxِAttempts: 2
};

const downloadFile = async function (_filePath, _fileLink, _options) {
    let { filePath, fileLink, options, useBaseDir } = handleArgs(_filePath, _fileLink, _options);
    const {
        baseDir,
        createPathIfNotExist,
        onProgress,
        deleteIfLessSize,
        downloadHaltMaxTime,
        maxِAttempts
    } = { ...defaultOptions, ...options };
    filePath = useBaseDir ? `${baseDir}/${filePath}` : filePath;

    let attempNo = 0;
    while (attempNo < maxِAttempts) {
        attempNo++;

        try {
            return await download(filePath, createPathIfNotExist, onProgress, deleteIfLessSize, fileLink, downloadHaltMaxTime);
        }
        catch (error) {
            console.log('[X] ERROR: Failed in attempt No', attempNo, ', due to: ', error);
            if (attempNo >= maxِAttempts)
                throw error;
        }
    }
};

module.exports = downloadFile;
