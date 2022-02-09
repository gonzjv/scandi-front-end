const INITIAL_STATE = 'initial URL';

const mainImageUrl = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_IMAGE':
      return action.url;
    default:
      return state;
  }
};

export default mainImageUrl;
