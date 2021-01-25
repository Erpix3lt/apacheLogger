const fs = require('fs')
const { LogToJSON } = require('log-to-json');

const converter = new LogToJSON();
 
function convertLogToJSON(){
    fs.createReadStream('apache20190906.log')
    .pipe(converter)
    .pipe(fs.createWriteStream('my.log.json'));
}

