const { download } = require('..');
const logProgress = require('./logProgress')

download(
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        baseDir: './files',
        onProgress: logProgress
    }
)
    .then(() => console.log('[!!!] END OF DOWNLOAD'))
    .catch(error => console.log('[x] ERROR DOWNLOADING', error))
