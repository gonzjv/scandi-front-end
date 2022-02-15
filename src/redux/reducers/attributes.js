const INITIAL_STATE = {};

const attributes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ATTRIBUTE':
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case 'CLEAR_ATTRIBUTES':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default attributes;
