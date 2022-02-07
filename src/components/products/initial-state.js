const PRODUCTS_INITIAL_STATE = {
  navigateToDesription: false,
  data: {
    category: {
      products: [
        {
          name: 'loading...',
          prices: [
            {
              currency: { label: 'USD' },
              amount: 'loading...',
            },
            {
              currency: { label: 'GBP' },
              amount: 'loading...',
            },
            {
              currency: { label: 'AUD' },
              amount: 'loading...',
            },
            {
              currency: { label: 'JPY' },
              amount: 'loading...',
            },
            {
              currency: { label: 'RUB' },
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
