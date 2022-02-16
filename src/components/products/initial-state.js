const PRODUCTS_INITIAL_STATE = {
  navigateToDesription: false,
  data: {
    category: {
      products: [
        {
          name: 'loading...',
          prices: [
            {
              currency: { symbol: '$' },
              amount: 'loading...',
            },
            {
              currency: { symbol: '£' },
              amount: 'loading...',
            },
            {
              currency: { symbol: 'A$' },
              amount: 'loading...',
            },
            {
              currency: { symbol: '¥' },
              amount: 'loading...',
            },
            {
              currency: { symbol: '₽' },
              amount: 'loading...',
            },
          ],
          gallery: [''],
        },
      ],
    },
  },
};

export default PRODUCTS_INITIAL_STATE;
