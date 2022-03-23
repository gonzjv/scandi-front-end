const DESCRIPTION_INITIAL_STATE = {
  data: {
    product: {
      name: '',
      description: '',
      category: '',
      inStock: false,
      brand: '',
      gallery: [],
      attributes: [
        {
          name: '',
          items: [
            {
              displayValue: '',
            },
          ],
        },
      ],
      prices: [
        {
          currency: {
            symbol: '$',
          },
          amount: 'loading...',
        },
      ],
    },
  },
};

export default DESCRIPTION_INITIAL_STATE;