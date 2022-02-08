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
    },
  },
};

export default DESCRIPTION_INITIAL_STATE;
