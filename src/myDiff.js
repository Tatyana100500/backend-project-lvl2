import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

const wd = '/Users/tatyana/Documents/GitHub/backend-project-lvl2';
const funcDiff = (file1, file2) => {
  let path1 = path.normalize(file1);
  let path2 = path.normalize(file2);
  if (!path.isAbsolute(path1)) {
    path1 = path.resolve(wd, path1);
  }
  if (!path.isAbsolute(path2)) {
    path2 = path.resolve(wd, path2);
  }
  const data1 = fs.readFileSync(path1);
  const data2 = fs.readFileSync(path2);
  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);
  const parseData1 = Object.keys(obj1).slice().sort();
  const parseData2 = Object.keys(obj2).slice().sort();
  let result = '';
  for (let i = 0; i < parseData1.length; i ++) {
    if (parseData2.includes(parseData1[i])) {
        if (obj1[parseData1[i]] === obj2[parseData1[i]]) {
          result += `  ${parseData1[i]}: ${obj1[parseData1[i]]}`;
        } else {
          result += ` - ${parseData1[i]}: ${obj1[parseData1[i]]}  + ${parseData1[i]}: ${obj2[parseData1[i]]}`;
        }
    } else {
      result += ` - ${parseData1[i]}: ${obj1[parseData1[i]]}`;
    }
  }
  for (let j = 0; j < parseData2.length; j ++) {
    if (!parseData1.includes(parseData2[j])) {
      result += ` + ${parseData2[j]}: ${obj2[parseData2[j]]}`;  
    } 
  }
  console.log(result);
};
export default funcDiff;