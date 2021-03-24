import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

/*const wd = '/Users/tatyana/Documents/GitHub/backend-project-lvl2/__fixtures__';
const makeAst = (d1, d2) => {
  //console.log(d1, d2);
  const parseData1 = Object.keys(d1).slice().sort();
  const parseData2 = Object.keys(d2).slice().sort();
  
  let result = '';
  for (let i = 0; i < parseData1.length; i + 1) {
    if (parseData2.includes(parseData1[i])) {
      if (d1[parseData1[i]] === d2[parseData1[i]]) {
        console.log(d1[parseData1[i]], `  ${parseData1[i]}: ${d1[parseData1[i]]}`);
        result += `  ${parseData1[i]}: ${d1[parseData1[i]]}`;
      } else {
        result += ` - ${parseData1[i]}: ${d1[parseData1[i]]}  + ${parseData1[i]}: ${d2[parseData1[i]]}`;
      }
    } else {
      result += ` - ${parseData1[i]}: ${d1[parseData1[i]]}`;
    }
  }
  for (let j = 0; j < parseData2.length; j + 1) {
    if (!parseData1.includes(parseData2[j])) {
      result += ` + ${parseData2[j]}: ${d2[parseData2[j]]}`;
    }
  }
  return result;
};

const func = (data1, data2) => {
// console.log(data1);
  const parseData1 = Object.keys(data1).slice().sort();
  const parseData2 = Object.keys(data2).slice().sort();
   console.log(parseData1, parseData2);
  let result = '';
  for (let i = 0; i < parseData1.length; i + 1) {
    if (parseData2.includes(parseData1[i])) {
      console.log(typeof (data1[parseData1[i]]), typeof (data2[parseData1[i]]));
      //if (typeof (data1[parseData1[i]]) === 'object' && typeof (data2[parseData1[i]]) === 'object') {
       // result += `${parseData1[i]}: {
       //      ${makeAst(data1[parseData1[i]], data2[parseData1[i]])}
       // }`;
      //} else {
      //  if (data1[parseData1[i]] === data2[parseData1[i]]) {
      //  result += `  ${parseData1[i]}: ${data1[parseData1[i]]}`;
     // } else {
      //  result += ` - ${parseData1[i]}: ${data1[parseData1[i]]}  + ${parseData1[i]}: ${data2[parseData1[i]]}`;
      //}
    //}
    //} else {
    //  result += ` - ${parseData1[i]}: ${data1[parseData1[i]]}`;
    }
  }
  //for (let j = 0; j < parseData2.length; j + 1) {
  //  if (!parseData1.includes(parseData2[j])) {
   //   result += ` + ${parseData2[j]}: ${data2[parseData2[j]]}`;
    //}
  //}
  return result;
};

const funcDiff = (file1, file2, formatName) => {
  let path1 = path.normalize(file1);
  let path2 = path.normalize(file2);
  if (!path.isAbsolute(path1)) {
    path1 = path.resolve(wd, path1);
  }
  if (!path.isAbsolute(path2)) {
    path2 = path.resolve(wd, path2);
  }
  const format1 = path.extname(path1);
  const format2 = path.extname(path2);
  console.log(format1, format2);
  let parse1;
  if (format1 === '' || format1 === '.json') {
    parse1 = JSON.parse;
  } else if (format1 === '.yml') {
    parse1 = yaml.load;
    console.log('parse', parse1);
  }
  let parse2;
  if (format2 === '' || format1 === '.json') {
    parse2 = JSON.parse;
  } else if (format2 === '.yml') {
    parse2 = yaml.load;
  }
  const obj1 = parse1(fs.readFileSync(path1));
  const obj2 = parse2(fs.readFileSync(path2));
  console.log('!!!', formatName);

  console.log(func(obj1, obj2));
};
export default funcDiff;
*/
const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  return _.sortBy(keys).map((key) => {
    const beforeValue = data1[key];
    const afterValue = data2[key];

    if (!_.has(data1, key)) {
      return {
        key, type: 'added', beforeValue, afterValue,
      };
    }

    if (!(_.has(data2, key))) {
      return {
        key, type: 'removed', beforeValue, afterValue,
      };
    }

    if (_.isPlainObject(beforeValue) && _.isPlainObject(afterValue)) {
      return {
        key, type: 'nested', children: buildDiff(beforeValue, afterValue),
      };
    }

    if (beforeValue !== afterValue) {
      return {
        key, type: 'changed', beforeValue, afterValue,
      };
    }

    return {
      key, type: 'unchanged', beforeValue, afterValue,
    };
  });

  // return _.sortBy(diff, 'key');
};

export default buildDiff;
