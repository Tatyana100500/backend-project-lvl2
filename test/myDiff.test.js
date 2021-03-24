/*import { test, expect } from '@jest/globals';
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
*/
import { test, expect } from '@jest/globals';
import * as url from 'url';
import * as path from 'path';
import * as fs from 'fs';

import genDiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
])('difference between %s and %s',
  (filename1, filename2) => {
    const stylishResult = readFixtureFile('expected.stylish.txt');
    const plainResult = readFixtureFile('expected.plain.txt');
    const jsonResult = readFixtureFile('expected.json.txt');

    const file1 = getFixturePath(filename1);
    const file2 = getFixturePath(filename2);

    expect(genDiff(file1, file2, 'stylish')).toBe(stylishResult);
    expect(genDiff(file1, file2, 'plain')).toBe(plainResult);
    expect(genDiff(file1, file2, 'json')).toBe(jsonResult);
  });
