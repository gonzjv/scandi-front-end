const INITIAL_STATE = { currency: 'USD' };

const currency = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_DOLLAR':
      return { currency: 'USD' };
    case 'SET_GBP':
      return { currency: 'GBP' };
    case 'SET_AUD':
      return { currency: 'AUD' };
    case 'SET_YEN':
      return { currency: 'JPY' };
    case 'SET_RUB':
      return { currency: 'RUB' };
    default:
      return state;
  }
};

export default currency;
