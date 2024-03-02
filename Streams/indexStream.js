const fs = require('fs');

const readStream = fs.createReadStream(__dirname+'/run.txt');

const writeStream = process.stdout;


console.log()