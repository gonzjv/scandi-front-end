const INITIAL_STATE = 'tech';

const category = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TECH':
      return 'tech';
    case 'SET_CLOTHES':
      return 'clothes';
    default:
      return state;
  }
};

export default category;
