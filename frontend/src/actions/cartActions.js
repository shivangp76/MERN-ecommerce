import { FETCH_CART, MODIFY_CART } from "./types";
import axios from "axios";

const proxy =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export const fetchCart = () => dispatch => {
  axios
    .get(proxy + "/api/cart/")
    .then(res => res.data)
    .then(newCart => {
      dispatch({
        type: FETCH_CART,
        payload: newCart
      });
    })
    .catch(e => console.log(e));
};

export const modifyCart = (id, action, SKU) => dispatch => {
  if (SKU) {
    axios
      .patch(proxy + "/api/cart/" + id, { action, SKU })
      .then(res => res.data)
      .then(newCart => {
        dispatch({
          type: MODIFY_CART,
          payload: newCart
        });
      })
      .catch(e => console.log(e));
  } else {
    axios
      .patch(proxy + "/api/cart/" + id, { action })
      .then(res => res.data)
      .then(newCart => {
        dispatch({
          type: MODIFY_CART,
          payload: newCart
        });
      })
      .catch(e => console.log(e));
  }
};
