# filedljs (file download js)
A small utility library for downloading files from the web, providing the following features:
- Accepts an onProgress callback, which receives a state object to indicate the progress of the downloading
- Automatically monitor the download, and abort it if it is halted for a specific period (configurable)
- Delete file if download didn't complete successfully (configurable)

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
const { download } = require('filedljs');
const logProgress = require('./logProgress')

download(
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
const { download } = require('filedljs');
const logProgress = require('./logProgress')

download(
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
download(
    './files/test.pdf',
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        onProgress: (state) => logProgress(state)
    }
)

```

- Prevent deleting the file if the download didn't complete (default: true)

```js
download(
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        deleteIfLessSize: false
    }
)
```

- Specify the maximum allowed time for download halt (default: 1 minute)

```js
download(
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        downloadHaltMaxTime: 2 * 60 * 1000, // in milliseconds
    }
)
```

- Prevent creating the file path if it doesn't exist (default: true)

```js
download(
    'http://file.allitebooks.com/20180714/React%20in%20Action.pdf',
    {
        createPathIfNotExist: false
    }
)
```

- Using all default values

```js
download('http://file.allitebooks.com/20180714/React%20in%20Action.pdf')
```

### Todo:
- Automatically retry downloading files
- Add proper comments

## Authors

* **Wael Hasan** - [waelhasan](https://github.com/waelhasan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details