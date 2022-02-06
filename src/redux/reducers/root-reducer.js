import { combineReducers } from 'redux';
import category from './category.js';
import currency from './currency.js';

const rootReducer = combineReducers({
  category,
  currency,
});

export default rootReducer;
