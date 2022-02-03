const INITIAL_STATE = { currency: 'USD' };

const currency = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_EURO':
      return { currency: 'EUR' };
    case 'SET_YEN':
      return { currency: 'JPY' };
    case 'SET_DOLLAR':
      return { currency: 'USD' };
    default:
      return state;
  }
};

export default currency;
