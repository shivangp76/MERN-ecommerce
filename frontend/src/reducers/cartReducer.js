import { FETCH_CART, MODIFY_CART } from "../actions/types";

const initialState = {
  items: [],
  containsLunchItem: false,
  totalQty: 0,
  totalPrice: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CART:
      return {
        ...state,
        items: action.payload.items,
        containsLunchItem: action.payload.containsLunchItem,
        totalQty: action.payload.totalQty,
        totalPrice: action.payload.totalPrice
      };
    case MODIFY_CART:
      return {
        ...state,
        items: action.payload.items,
        containsLunchItem: action.payload.containsLunchItem,
        totalQty: action.payload.totalQty,
        totalPrice: action.payload.totalPrice
      };
    default:
      return state;
  }
}
