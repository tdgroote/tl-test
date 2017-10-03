export const combineObjs = (...objs) => Object.assign({}, ...objs);
export const get = key => obj => obj[key];
export const isId = id => item => item.id === id;
export const isNotId = id => item => item.id !== id;
export const getById = (items, id) => items.find(isId(id));
export const removeById = (items, id) => items.filter(isNotId(id));
export const concat = (...items) => [].concat(...items);
// takes a key and will on its next call return an object with the first
// argument set on the previously provided key.
export const argToObjKey = key => arg => ({ [key]: arg });
