export const addToCart = (name, imageUrl, prices, attributes) => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      name: name,
      imageUrl: imageUrl,
      prices: prices,
      attributes: attributes,
    },
  };
};
