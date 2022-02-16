import { v4 as uuidv4 } from 'uuid';
const INITIAL_STATE = [];

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { name, imageUrl, prices, attributes, quantity } =
        action.payload;
      return [
        ...state,
        {
          name: name,
          imageUrl: imageUrl,
          prices: prices,
          attributes: attributes,
          quantity: quantity,
          id: uuidv4(),
        },
      ];

    case 'INCREASE_QUANTITY':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

    case 'DECREASE_QUANTITY':
      return state.map((item) => {
        if (item.id === action.payload.id && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

    default:
      return state;
  }
};

export default cart;
