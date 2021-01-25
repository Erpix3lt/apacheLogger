const PORT = process.env.PORT || 5000

const express = require('express'),
app = express(); 
app.use('/', express.static(__dirname + '/'));
app.listen(PORT);

const fs = require('fs');
const regexWithUser = /^(\S+) (\S+) (\S+) (\[(.*?)\]) (\"(.*?)\&)(\username(.*?)\&)(\pw(.*?)\") (\S+) (\"(.*?)\")/;
const regex = /^(\S+) (\S+) (\S+) (\[(.*?)\]) (\"(.*?)\") (\S+) (\"(.*?)\")/;
let found;

try {
    // read contents of the file
    const logFile = fs.readFileSync('resources/apache20190906.log', 'UTF-8');

    // split the contents by new line
    const lines = logFile.split(/\r?\n/);

    // print all lines
    lines.forEach((line) => {
        if (!line.includes('username')) {
            const data = convertLineToArray(line);
            deleteSensibleValues(data);
            console.log(data);
            writeToJSON(data);
        }
        else {
            const dataUser = convertLineToArrayWithUser(line);
            deleteSensibleValuesUser(dataUser);
            console.log(dataUser);
            writeToJSON(dataUser);
        }

    });
} catch (err) {
    console.error(err);
}


function convertLineToArrayWithUser(line) {
    found = line.match(regexWithUser);

    const dataUser = {
        ip: found[1],
        date: found[4],
        adress: found[7],
        username: found[9],
        pw: found[11],
        status: found[12],
        device: found[14]
    }
    return dataUser;
}

function convertLineToArray(line) {
    found = line.match(regex);

    const data = {
        ip: found[1],
        date: found[5],
        adress: found[7],
        status: found[8],
        device: found[10]
    }
    return data;
}


function deleteSensibleValuesUser(dataUser) {
    dataUser.ip = "00.00.0.000";
    dataUser.username = "=USERNAME";
    dataUser.pw = "=PASSWORD";
}

function deleteSensibleValues(data) {
    data.ip = "00.00.0.000";
}

function writeToJSON (data){
    const dataString = JSON.stringify(data);
    try {
        fs.appendFileSync('log.json', dataString);
        console.log("JSON data is saved.");
    } catch (error) {
        console.error(err);
    }
}