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

export const deleteFromCart = (itemId, itemPrices, itemQuantity) => {
  return {
    type: 'DELETE_FROM_CART',
    payload: {
      itemId: itemId,
      itemPrices: itemPrices,
      itemQuantity: itemQuantity,
    },
  };
};

export const increaseQuantity = (id) => {
  return { type: 'INCREASE_QUANTITY', payload: { id: id } };
};

export const decreaseQuantity = (id) => {
  return { type: 'DECREASE_QUANTITY', payload: { id: id } };
};
