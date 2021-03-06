import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  categories: categoryReducer,
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer
});
