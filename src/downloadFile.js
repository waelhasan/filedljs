const fs = require('fs');
const progress = require('request-progress');
const request = require('request');

const handleArgs = require('./handleArgs');
const handlePathCreation = require('./handlePathCreation');
const ProgressMonitor = require('./ProgressMonitor');

const defaultOptions = {
    baseDir: '.',
    createPathIfNotExist: true,
    downloadHaltMaxTime: 1 * 60 * 1000,
    onProgress: function () { },
    deleteIfLessSize: true
};

const download = function (_filePath, _fileLink, _options) {
    let { filePath, fileLink, options, useBaseDir } = handleArgs(_filePath, _fileLink, _options);
    const {
        baseDir,
        createPathIfNotExist,
        onProgress,
        deleteIfLessSize,
        downloadHaltMaxTime
    } = { ...defaultOptions, ...options };
    filePath = useBaseDir ? `${baseDir}/${filePath}` : filePath;

    handlePathCreation(filePath, createPathIfNotExist);

    const file = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
        let progressMonitor;
        let totalSize = 1000;

        const onProgressHandler = (state) => {
            progressMonitor.handleNewProgress();
            onProgress(state);
            totalSize = state.size.total;
            progressMonitor.setTotalSize(totalSize);
        };

        const onErrorHandler = (error) => {
            progressMonitor.cancelTimer();
            rejectFn(error);
        };

        const onEndHandler = () => {
            progressMonitor.cancelTimer();
            if (deleteIfLessSize)
                if (fs.existsSync(filePath))
                    fs.statSync(filePath).size >= totalSize ? resolve() : rejectFn('not the same size.')
                else
                    rejectFn();
            else
                resolve();
        };

        const req = progress(request(fileLink, {}))
            .on('progress', onProgressHandler)
            .on('error', onErrorHandler)
            .on('end', onEndHandler);

        req.pipe(file);

        const rejectFn = (error) => {
            req.abort();
            reject(error);
        };

        progressMonitor = new ProgressMonitor(resolve, rejectFn, filePath, downloadHaltMaxTime);
    });
};

module.exports = download;
