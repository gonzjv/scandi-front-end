import { combineReducers } from 'redux';
import category from './category.js';
import currency from './currency.js';
import mainImageUrl from './main-image.js';
import attributes from './attributes.js';
import cart from './cart.js';
import layout from './layout.js';
import categories from './categories.js';

const rootReducer = combineReducers({
  category,
  currency,
  mainImageUrl,
  attributes,
  cart,
  layout,
  categories,
});

export default rootReducer;
