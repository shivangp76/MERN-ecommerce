import { FETCH_CATEGORIES } from "./types";
import axios from "axios";

const proxy =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export const fetchCategories = () => dispatch => {
  axios
    .get(proxy + "/api/categories/")
    .then(res => res.data)
    .then(categories => {
      dispatch({
        type: FETCH_CATEGORIES,
        payload: categories
      });
    })
    .catch(e => console.log(e));
};
