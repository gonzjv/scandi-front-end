export const addToCart = (name, imageUrl, prices, attributes) => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      name: name,
      imageUrl: imageUrl,
      prices: prices,
      attributes: attributes,
      quantity: 1,
    },
  };
};

export const increaseQuantity = (id) => {
  return { type: 'INCREASE_QUANTITY', payload: { id: id } };
};

export const decreaseQuantity = (id) => {
  return { type: 'DECREASE_QUANTITY', payload: { id: id } };
};
