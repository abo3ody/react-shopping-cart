import axios from "axios";
import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
   const response = await axios("/api/products");

   console.log(response.data);
   dispatch({
      type: FETCH_PRODUCTS,
      payload: response.data,
   });
};
