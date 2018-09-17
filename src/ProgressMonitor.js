const fs = require('fs');

class ProgressMonitor {
    constructor(resolveFun, rejectFun, filePath, downloadHaltMaxTime) {
        this.resolveFun = resolveFun;
        this.rejectFun = rejectFun;
        this.filePath = filePath;
        this.downloadHaltMaxTime = downloadHaltMaxTime;

        this.createTimer();
    }

    setTotalSize(totalSize) {
        this.totalSize = totalSize;
    }

    createTimer() {
        this.timer = setInterval(() => {
            if (fs.existsSync(this.filePath)) {
                fs.statSync(this.filePath).size >= this.totalSize ?
                    this.resolveFun() :
                    this.rejectFun('Error due to download halt. retry')
            }
        }, this.downloadHaltMaxTime);
    }

    handleNewProgress() {
        // clearInterval(this.timer);
        this.createTimer();
    }

    cancelTimer() {
        clearInterval(this.timer);
    }
}

module.exports = ProgressMonitor;
