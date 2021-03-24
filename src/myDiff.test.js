import { test, expect } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import myDiff from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('myDiff', () => {
  const result = readFile('stylish');
  expect(myDiff('testfile1.json', 'testfile2.json')).toEqual(result);
  const result2 = readFile('stylish');
  expect(myDiff('testfile1.json', 'testfile2.json', 'stylish')).toEqual(result2);
  const result3 = readFile('stylish');
  expect(myDiff('testfile1.yml', 'testfile2.yml')).toEqual(result3);
});
