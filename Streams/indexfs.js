import { readFile,writeFile } from "fs/promises";

const filepath = new URL('./run.txt',import.meta.url);

let contents = await readFile(filepath, {encoding:'utf-8'});

console.log(contents);