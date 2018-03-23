const yargs = require('yargs');
var fileSystem = require('fs');

const readData=(cb)=> {
    fileSystem.readFile('name.json', function (error, contents) {
        let data = JSON.parse(contents);
        cb(data);
    })
}


const printData=function(data){
    let slNo = 1;
    data.name.forEach(function (element) {
        console.log(slNo + '.' + element);
        slNo++;
    })
}
const writeData=(data) =>{
    fileSystem.writeFile('name.json', JSON.stringify(data), function (error) {
        if (error) {
            console.log(error);
        }
    })
}

if (yargs.argv.options == 'read') {
    readData((data) => {
        printData(data);
    })
}


if (yargs.argv.options == 'write') {

    readData((data) => {
        data.name.push(yargs.argv._[0]);
        writeData(data);
        printData(data);
    })
}

if (yargs.argv.options == 'remove') {
    let index = 0;
    var flag = 0;
    readData((data) => {
        data.name.forEach(function (element) {
            if (element == yargs.argv._[0]) {
                flag = 1;
                data.name.splice(index, 1);
            }
            index++;
        })
        if (flag == 0) {
            console.log("element not found");
        }
        else {
            writeData(data);
            printData(data);
        }
    })
}