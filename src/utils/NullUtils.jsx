export const isNullReturnString = (data) => {
  return data === null || data === undefined ? "" : data;
};

export const isNullReturnString2 = (data, returnString) => {
  return data === null || data === undefined ? "" : returnString;
};

export const isNull = (data) => {
  return data === null || data === undefined;
};

export const isNotNull = (data) => {
  return !data === null || !data === undefined;
};
