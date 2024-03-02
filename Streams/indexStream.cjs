const fs = require('fs');
const TransformStream = require('stream').Transform;


const readStream = fs.createReadStream(__dirname+'/run.txt');
const filewriteStream = fs.createWriteStream(__dirname+'/write.txt');

const transformStream = new TransformStream({
    transform(chunk,ebc,cb){
        this.push(chunk.toString().toUpperCase());
        setTimeout(cb,3000);
    }
})

const writeStream = process.stdout;

readStream.pipe(transformStream).pipe(writeStream);

readStream.pipe(transformStream).pipe(filewriteStream);