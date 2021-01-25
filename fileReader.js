

class FileReader{
    constructor(){

    }
    convertLogToJSON(){
    const fs = require('fs')
    const { LogToJSON } = require('log-to-json');
    
    const converter = new LogToJSON();
    fs.createReadStream('resources/apache20190906.log')
    .pipe(converter)
    .pipe(fs.createWriteStream('my.log.json'));
}

}
module.exports = FileReader;

