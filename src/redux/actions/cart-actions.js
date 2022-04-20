export const addToCart = (
  name,
  gallery,
  prices,
  attributes,
  allAttributes
) => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      name: name,
      gallery: gallery,
      prices: prices,
      attributes: attributes,
      allAttributes: allAttributes,
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

export const nextImage = (id) => {
  return { type: 'NEXT_IMAGE', payload: { id: id } };
};

export const prevImage = (id) => {
  return { type: 'PREV_IMAGE', payload: { id: id } };
};
