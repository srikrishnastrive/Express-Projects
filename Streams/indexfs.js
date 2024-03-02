import { write } from 'fs';
import {readFile,writeFile} from 'fs/promises';
import { url } from 'inspector';

const filepath = new URL('./run.txt',import.meta.url);

let contents = await readFile(filepath, {encoding:'utf-8'});

console.log(contents);