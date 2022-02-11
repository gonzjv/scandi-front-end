const INITIAL_STATE = [];

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { name, imageUrl } = action.payload;
      return [...state, { name: name, imageUrl: imageUrl }];
    default:
      return state;
  }
};

export default cart;
