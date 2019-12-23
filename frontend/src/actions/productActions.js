import { FETCH_PRODUCTS } from "./types";
import axios from "axios";

const proxy =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export const fetchProducts = categoryID => dispatch => {
  axios
    .get(proxy + "/api/products/category/" + categoryID)
    .then(res => res.data)
    .then(products => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      });
    })
    .catch(e => console.log(e));
};
