/* 
fs.readFile('apache20190906.log', 'utf8', function(err, data) {
    const dataAsJson = JSON.stringify(data);
    console.log(dataAsJson)
    return dataAsJson;
});
 */

const abc = require('fileReader.js');

abc.convertLogtoJSON();





