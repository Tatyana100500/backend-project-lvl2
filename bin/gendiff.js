#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import diff from '../index.js';

const program = new Command();
program.version('0.0.1', '-V, --version', 'output the version number');
program.helpOption('-h, --help', 'output usage information');
program.arguments('<filepath1> <filepath2>');
// .action((filepath1, filepath2) => {
// console.log('filepath1:', filepath1);
// console.log('filepath2:', filepath2);
// });
program.option('-f, --format [type]', 'output format');
program
  .arguments('format')
  .description('Compares two configuration files and shows a difference.', {
    format: 'output format',
  })
  .action((format) => {
    console.log('format:', format);
  });
program.parse();
const a = program.parse(process.argv);
console.log('!!!!!!!', a.args);
console.log('Options: ', diff(a.args[0], a.args[1]));
