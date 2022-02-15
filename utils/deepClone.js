// @ts-check
/**
 * 深拷贝
 * @param {any} value
 * @param {Map<any, any>} visited
 * 1. 值类型: number、boolean、string、null、undefined、BigInt
 * 2. 引用类型: Object、Array
 * 3. 其他类型: Map、Set、Date
 * 
 * !!!attention: 原型链上的不会被复制
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
 */
function deepClone(value, visited) {
    let newO;
    /** @type {Map<any, any>} */
    visited = visited === undefined ? new Map() : visited;

    if (visited.get(value)) {
        return visited.get(value);
    }
    
    if ((typeof value === 'object' || typeof value === 'function') && value !== null) {
        if (Array.isArray(value)) {
            newO = new Array(value.length);
            visited.set(value, newO);
            for(let i = 0;i < value.length;i++) {
                newO.push(deepClone(value[i], visited));
            }
        } else {
            switch(Object.prototype.toString.call(value)) {
                case '[object Set]': {
                    newO = new Set();
                    value.forEach(value => newO.add(value));
                    break;
                }
                case '[object Map]': {
                    newO = new Map();
                    value.forEach((value, key) => newO.set(key, value));
                    break;
                }
                case '[object Date]': {
                    newO = new Date(+value);
                    break;
                }
                default: {
                   // plain object
                    newO = Object.create(null);
                    visited.set(value, newO);
                    for(let key in value) {
                        newO[key] = deepClone(value[key], visited);
                    }
                }
            }
        }
    } else {
        newO = value;
        visited.set(value, newO);
    }

    return newO;
}