const INITIAL_STATE = 'USD';

const currency = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_DOLLAR':
      return 'USD';
    case 'SET_GBP':
      return 'GBP';
    case 'SET_AUD':
      return 'AUD';
    case 'SET_YEN':
      return 'JPY';
    case 'SET_RUB':
      return 'RUB';
    default:
      return state;
  }
};

export default currency;
