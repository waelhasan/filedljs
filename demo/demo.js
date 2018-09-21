const { downloadFile } = require('..');
const logProgress = require('./logProgress')

downloadFile(
    'http://file.allitebooks.com/20160423/Kubernetes%20Microservices%20with%20Docker.pdf',
    {
        baseDir: './files',
        onProgress: logProgress
    }
)
    .then(() => console.log('[!!!] END OF DOWNLOAD'))
    .catch(error => console.log('[x] ERROR DOWNLOADING', error))
