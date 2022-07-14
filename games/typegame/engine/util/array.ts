import { isArray } from "../util/util";

export function remove<T>(arr: T[], object: T) {
  let i = arr.indexOf(object);
  if (i >= 0) {
    arr.splice(i, 1);
  }
}

export function partition<T>(n: number, collection: any[], converter?: (x) => T): T[][] {
  let result = [];
  let group = [];
  converter = converter ? converter : x => x;
  for (let i = 0, j = 0; i < collection.length; i++) {
    group.push(converter(collection[i]));
    j++;
    if (j === n) {
      result.push(group);
      j = 0;
      group = [];
    }
  }
  return result;
}

export function map<T>(arr: any[], mapper: (x) => T) {
  let output = [];
  arr.forEach((v, i, a) => {
    let x = mapper(v);
    output.push(x);
  });
  return output;
}

export function first<T>(arr: T[]): T {
  if (arr && arr.length > 0) {
    return arr[0];
  }
  return undefined;
}

export function last<T>(arr: T[]): T {
  if (arr) {
    return arr[arr.length - 1];
  }
  return undefined;
}

export function find<T>(arr: T[], predicate: (o: T) => boolean) {
  if (arr && arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      if (predicate(arr[i])) {
        return arr[i];
      }
    }
  }
  return undefined;
}

export function createArray(length, value) {
  let arr = [];
  for (let i = 0; i < length; i++)
    arr.push(value);
  return arr;
}

export function create2DArray(len1, len2, value) {
  let arr = [];
  if (isArray(len2)) {
    for(let i = 0; i < len1; i++){
        arr.push(createArray(len2[i], value));
    }
  } else {
    for (let i = 0; i < len1; i++)
      arr.push(createArray(len2, value));
  }
  return arr;
}
