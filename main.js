/* 
fs.readFile('apache20190906.log', 'utf8', function(err, data) {
    const dataAsJson = JSON.stringify(data);
    console.log(dataAsJson)
    return dataAsJson;
});
 */

const FileReader = require('./fileReader.js'); 
const fileReader = new FileReader();


fileReader.convertLogToJSON();




