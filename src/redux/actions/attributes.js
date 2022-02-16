export const setAttribute = (name, value) => {
  return {
    type: 'SET_ATTRIBUTE',
    payload: { name: name, value: value },
  };
};

export const clearAttributes = () => {
  return {
    type: 'CLEAR_ATTRIBUTES',
  };
};
