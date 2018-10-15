const assert = require('assert');
const handleArgs = require('./../../src/handleArgs');

describe('handleArgsTest', function() {
    // Possible break in windows, refer to https://nodejs.org/docs/latest/api/path.html#path_windows_vs_posix

    describe('oneArgsSpecified', function() {
        var _filePath = 'http://test.link.com/filepath/Foo%20in%20Bar.pdf';
        it('it should be given val', function() {
            let {
                filePath,
                fileLink,
                options,
                useBaseDir
            } = handleArgs(_filePath);
            assert.equal(filePath, 'Foo in Bar.pdf');
            assert.equal(fileLink, _filePath);
        });
    });

    describe('twoArgsSpecified', function() {
        var _fileLink = 'http://test.link.com/filepath/Foo%20in%20Bar.pdf';
        var _filePath = './files/changedName.pdf';
        it('it should be given val', function() {
            let {
                filePath,
                fileLink,
                options,
                useBaseDir
            } = handleArgs(_filePath, _fileLink);
            assert.equal(filePath, 'changedName.pdf');
            assert.equal(fileLink, _filePath);
        });
    });

    describe('threeArgsSpecified', function() {
        var _fileLink = 'http://test.link.com/filepath/Foo%20in%20Bar.pdf';
        var _filePath = './files/changedName.pdf';
        var _options = {
            createPathIfNotExist: false
        };
        it('it should be given val', function() {
            let {
                filePath,
                fileLink,
                options,
                useBaseDir
            } = handleArgs(_filePath, _fileLink, _options);
            assert.equal(filePath, _filePath);
            assert.equal(fileLink, _fileLink);
            assert.equal(options, _options);
        });
    });
});
