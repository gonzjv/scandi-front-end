export const setCurrency = (symbol) => {
  return {
    type: 'SET_CURRENCY',
    payload: {
      symbol: symbol,
    },
  };
};
