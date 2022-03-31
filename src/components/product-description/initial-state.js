const DESCRIPTION_INITIAL_STATE = {
  isGalleryAtTop: true,
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
        {
          currency: {
            symbol: '£',
          },
          amount: 'loading...',
        },
        {
          currency: {
            symbol: 'A$',
          },
          amount: 'loading...',
        },
        {
          currency: {
            symbol: '¥',
          },
          amount: 'loading...',
        },
        {
          currency: {
            symbol: '₽',
          },
          amount: 'loading...',
        },
      ],
    },
  },
};

export default DESCRIPTION_INITIAL_STATE;
