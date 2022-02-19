import { v4 as uuidv4 } from 'uuid';
const INITIAL_STATE = {
  items: [],
  itemsInCart: 0,
  total: [
    {
      currency: { symbol: '$' },
      amount: 0,
    },
    {
      currency: { symbol: '£' },
      amount: 0,
    },
    {
      currency: { symbol: 'A$' },
      amount: 0,
    },
    {
      currency: { symbol: '¥' },
      amount: 0,
    },
    {
      currency: { symbol: '₽' },
      amount: 0,
    },
  ],
};

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { name, imageUrl, prices, attributes, quantity } =
        action.payload;
      return {
        itemsInCart: state.itemsInCart + 1,
        total: state.total.map((elem) => {
          return {
            ...elem,
            amount:
              elem.amount +
              prices.find(
                (price) =>
                  price.currency.symbol === elem.currency.symbol
              ).amount,
          };
        }),
        items: [
          ...state.items,
          {
            name: name,
            imageUrl: imageUrl,
            prices: prices,
            attributes: attributes,
            quantity: quantity,
            id: uuidv4(),
          },
        ],
      };

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id && item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

export default cart;
