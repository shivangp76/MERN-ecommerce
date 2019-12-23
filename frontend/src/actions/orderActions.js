import { NEW_ORDER } from "./types";
import axios from "axios";

const proxy =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export const newOrder = orderData => dispatch => {
  axios
    .post(proxy + "/api/orders/", orderData)
    .then(res => res.data)
    .then(order => {
      dispatch({
        type: NEW_ORDER,
        payload: order
      });
    })
    .catch(e => console.log(e));
};
