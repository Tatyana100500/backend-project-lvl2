#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
const program = new Command();
program.version('0.0.1', '-V, --version', 'output the version number');
program.helpOption('-h, --help', 'output usage information');
program.parse();
console.log('Options: ', program.opts());