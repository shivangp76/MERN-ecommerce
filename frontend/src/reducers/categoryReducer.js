import { FETCH_CATEGORIES } from "../actions/types";

const initialState = {
  categories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
}
