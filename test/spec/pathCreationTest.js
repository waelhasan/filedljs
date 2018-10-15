const assert = require('assert');
const fs = require('fs');
const handlePathCreation = require('./../../src/handlePathCreation');

describe('pathCreationTest', function() {

    before(function() {
        if(fs.existsSync('./down load')) { fs.rmdirSync('./down load'); }
        if(fs.existsSync('./dĺ')) { fs.rmdirSync('./dĺ'); }
        if(fs.existsSync('./dl')) { fs.rmdirSync('./dl'); }
    });

    after(function() {
        if(fs.existsSync('./down load')) { fs.rmdirSync('./down load'); }
        if(fs.existsSync('./dĺ')) { fs.rmdirSync('./dĺ'); }
        if(fs.existsSync('./dl')) { fs.rmdirSync('./dl'); }
    });

    describe('pathWithSpacesTest', function() {
        it('should be able to create a path which contains spaces', function(){
            var dirPath = './down load';
            handlePathCreation(dirPath + '/file.txt', true);
            assert.equal(fs.existsSync(dirPath), true);
        });
    });

    describe('unicodePathTest', function() {
        it('should be able to create a path which contains unicode', function(){
            var dirPath = './dĺ';
            handlePathCreation(dirPath + '/file.txt', true);
            assert.equal(fs.existsSync(dirPath), true);
        });
    });

    describe('failWhenPathNotExistsTest', function() {
        it('should thow error when createPathIfNotExist is not specified/false', function(){
            var filePath = './dl/file.txt';
            try{
                handlePathCreation(filePath);
                assert.ok(false); // Error should be thrown
            }
            catch(err){
                assert.ok(true);
            }
        });
    });

});
