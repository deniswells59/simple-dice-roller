// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const enumToObject = (enumToConvert: any) => {
  const keysButWithValues = Object.keys(enumToConvert);
  const keysWithNoValues = keysButWithValues.filter((x) => isNaN(parseInt(x)));

  const object = keysWithNoValues.reduce((acc, key) => ({ [key]: enumToConvert[key], ...acc }), {});

  return object;
};
