export const addToCart = (name, imageUrl) => {
  return {
    type: 'ADD_TO_CART',
    payload: { name: name, imageurl: imageUrl },
  };
};
