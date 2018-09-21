const fs = require('fs');
const progress = require('request-progress');
const request = require('request');
const handlePathCreation = require('./handlePathCreation');
const ProgressMonitor = require('./ProgressMonitor');

const download = (filePath, createPathIfNotExist, onProgress, deleteIfLessSize, fileLink, downloadHaltMaxTime) => {
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
