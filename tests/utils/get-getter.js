// Return the getter for a given object and key
export default (obj, key) => Object.getOwnPropertyDescriptor(obj, key).get;
