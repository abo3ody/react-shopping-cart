import axios from "axios";
import {
   FETCH_PRODUCTS,
   FILTER_PRODUCTS_BY_SIZE,
   ORDER_PRODUCTS_BY_PRICE,
} from "../types";

export const fetchProducts = () => async (dispatch) => {
   const response = await axios("/api/products");

   console.log(response.data);
   dispatch({
      type: FETCH_PRODUCTS,
      payload: response.data,
   });
};

export const filterProducts = (products, size) => (dispatch) => {
   dispatch({
      type: FILTER_PRODUCTS_BY_SIZE,
      payload: {
         size,
         items:
            size === ""
               ? products
               : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
      },
   });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
   const sortedProducts = filteredProducts.slice();
   if (sort === "latest") {
      sortedProducts.sort((a, b) => a._id - b._id);
   } else {
      sortedProducts.sort((a, b) =>
         sort === "lowest"
            ? a.price > b.price
               ? 1
               : -1
            : a.price > b.price
            ? -1
            : 1
      );
   }
   dispatch({
      type: ORDER_PRODUCTS_BY_PRICE,
      payload: {
         sort,
         items: sortedProducts,
      },
   });
};
