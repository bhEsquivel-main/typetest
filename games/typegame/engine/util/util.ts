
export interface Type extends Function { new(...args): any; }
export function isBlank(obj: any): boolean {
    return obj === undefined || obj === null;
}

export function isType(obj: any): obj is Type {
    return isFunction(obj);
}
export function isFunction(obj: any): obj is Function {
    return typeof obj === "function";
}
export function isString(obj: any): obj is string {
    return typeof obj === "string";
}

export function isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
}

export function isArray(obj: any): boolean {
    return Array.isArray(obj);
}

export interface Map<T> {
    [key: string]: T;
}

export function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
export function isVowelRegEx(char) {
    if (char.length == 1) {
        return /[aeiou]/.test(char);
    }
}