export const convertObjectoToArray = objName => {
  const allKeys = Object.keys(objName);
  return allKeys.map(key => objName[key]);
}
