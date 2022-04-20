const INITIAL_STATE = '$';

const currency = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_DOLLAR':
      return '$';

    case 'SET_GBP':
      return '£';

    case 'SET_AUD':
      return 'A$';

    case 'SET_YEN':
      return '¥';

    case 'SET_RUB':
      return '₽';

    case 'SET_CURRENCY':
      return action.payload.symbol;
    default:
      return state;
  }
};

export default currency;
