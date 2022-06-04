export const setItem = (key, obj) => {
  window.localStorage.setItem(key, JSON.stringify(obj));
};

export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};
