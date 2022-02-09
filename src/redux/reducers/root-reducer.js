import { combineReducers } from 'redux';
import category from './category.js';
import currency from './currency.js';
import mainImageUrl from './main-image.js';

const rootReducer = combineReducers({
  category,
  currency,
  mainImageUrl,
});

export default rootReducer;
