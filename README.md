# filedljs (file download js)
A small utility library for downloading files from the web, providing the following features:
- Accepts an onProgress callback, which receives a state object to indicate the progress of the downloading
- Automatically monitor the download, and abort it if it is halted for a specific period (configurable)
- Delete file if download didn't complete successfully (configurable)
- Automatically retry downloading the file if something went wrong, and the maximum number of download attempts is configurable

### Installing

Clone using git 
```
git clone  https://github.com/waelhasan/filedljs.git  filedljs
cd filedljs/
npm install
```
Install with npm
```
npm install --save filedljs
```

### Testing

```
npm test
```

### Usage

```js
const { downloadFile } = require('filedljs');
const logProgress = require('./logProgress')

downloadFile(
    <file_path>, // optional
    <file_url>,
    <options_object> // optional
)
    .then(() => {})
    .catch(error => {})

```

### Examples

- Using the original name of the file, and specifying the download folder

```js
const { downloadFile } = require('filedljs');
const logProgress = require('./logProgress')

downloadFile(
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        baseDir: './files'
    }
)
    .then(() => console.log('[!!!] END OF DOWNLOAD'))
    .catch(error => console.log('[x] ERROR DOWNLOADING', error))

```

- Specifying the full path and file name

```js
downloadFile(
    './files/test.pdf',
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        onProgress: (state) => logProgress(state)
    }
)

```

- Prevent deleting the file if the download didn't complete (default: true)

```js
downloadFile(
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        deleteIfLessSize: false
    }
)
```

- Specify the maximum allowed time for download halt (default: 1 minute)

```js
downloadFile(
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        downloadHaltMaxTime: 2 * 60 * 1000, // in milliseconds
    }
)
```

- Prevent creating the file path if it doesn't exist (default: true)

```js
downloadFile(
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        createPathIfNotExist: false
    }
)
```

- Automatically retry downloading the file for 3 times

```js
downloadFile(
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        maxِAttempts: 3
    }
)
```

- Using all default values

```js
downloadFile('http://file.allitebooks.com/20180714/React%20in%20Action.pdf')
```

### Default options:

These are the default values of the option object fields:

```js
const defaultOptions = {
    baseDir: '.',
    createPathIfNotExist: true,
    downloadHaltMaxTime: 1 * 60 * 1000,
    onProgress: function () { },
    deleteIfLessSize: true,
    maxِAttempts: 2
};
```

### Todo:

- Add more tests:
    - unit tests 
    - testing the download functionality (mocking the network)
    - testing ProgressMonitor (mocking timers)
- Add proper comments

## Authors

* **Wael Hasan** - [waelhasan](https://github.com/waelhasan)

## Contributors
* **M4rk9696** - [M4rk9696](https://github.com/M4rk9696)
Added some unit tests

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
