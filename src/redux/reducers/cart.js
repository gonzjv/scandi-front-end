const INITIAL_STATE = [];

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { name, imageUrl, prices, attributes } = action.payload;
      return [
        ...state,
        {
          name: name,
          imageUrl: imageUrl,
          prices: prices,
          attributes: attributes,
        },
      ];
    default:
      return state;
  }
};

export default cart;
