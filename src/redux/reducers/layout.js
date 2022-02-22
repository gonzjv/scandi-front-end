const INITIAL_STATE = {};

const layout = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_MINI_CART_VISIBLE':
      return { isMiniCartVisible: true };
    case 'UNSET_MINI_CART_VISIBLE':
      return { isMiniCartVisible: false };
    default:
      return state;
  }
};

export default layout;
