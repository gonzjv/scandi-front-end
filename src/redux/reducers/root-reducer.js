import { combineReducers } from 'redux';
import category from './category.js';
import currency from './currency.js';
import mainImageUrl from './main-image.js';
import attributes from './attributes.js';

const rootReducer = combineReducers({
  category,
  currency,
  mainImageUrl,
  attributes,
});

export default rootReducer;
