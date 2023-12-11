import axios from "axios";

// Redux
import { ThunkAction } from "@reduxjs/toolkit";
import { addToCart, removeFromCart, updateCart } from "../slices/cartSlice";
import { RootState } from "../store";

// Action Types
export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// Action Creators
interface FetchDataRequest {
  type: typeof FETCH_DATA_REQUEST;
}

interface FetchDataSuccess {
  type: typeof FETCH_DATA_SUCCESS;
  payload: string; // Replace with the actual data type you are fetching
}

interface FetchDataFailure {
  type: typeof FETCH_DATA_FAILURE;
  error: string;
}

export type DataActionTypes =
  | FetchDataRequest
  | FetchDataSuccess
  | FetchDataFailure;

// Updated Thunk Action
interface AddToCartParams {
  type: string;
  products?: any;
  productId?: string;
  quantity?: number;
}

interface RemoveFromCartParams {
  type: string;
  productIds?: any;
  quantity?: number;
}

interface UpdateCartParams {
  type: string;
  productId: any;
  quantity: number
}

const mergeArrays = (arr1:any, arr2:any, key:any) => {
  const map = new Map();
  arr1.forEach((item:any) => map.set(item[key], item));
  arr2.forEach((item:any) => map.set(item[key], { ...map.get(item[key]), ...item }));

  return Array.from(map.values());
};

// Thunk Actions
const addToCartThunk =
  (
    params: AddToCartParams
  ): ThunkAction<void, RootState, undefined, DataActionTypes> =>
    async (dispatch, getState) => {
      const saveCartItems = (product:any) =>{
        dispatch(
          addToCart({
            productId: product.productId,
            quantity: product.quantity,
          })
        );
      }

      dispatch({ type: FETCH_DATA_REQUEST });
      let cart = getState().cart.cart;
      const { type } = params;

      if (type == "loggedIn") {
        let { products } = params;

        try {
          const user = getState().auth.user;
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/cart`,
            {
              products: products,
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: user.token ? `Bearer ${user.token}` : "",
                token: user.token ? user.token : "",
              },
            }
          );

          if (res.data.success) {
            let localCart = cart // local cart (saved in redux, localstorage)
            let userCart = res.data.cart; // loggedin user cart
            let mergedCart = mergeArrays(localCart,userCart,'productId')

            console.log(mergedCart)
            mergedCart.forEach((product: any, i: number) => {
                  saveCartItems(product)
            });

            dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
          }
        } catch (error) {
          dispatch({ type: FETCH_DATA_FAILURE, error: "Failed to fetch data" });
        }
      } else {
        const { productId, quantity } = params;

        dispatch(
          addToCart({
            productId,
            quantity,
          })
        );
      }
    };

const removeFromCartThunk = 
(
  params: RemoveFromCartParams
): ThunkAction<void, RootState, undefined, DataActionTypes> =>
    async (dispatch, getState) => {
    const removeCartItems = (products: any) =>{
      dispatch(removeFromCart({
        ids: productIds
      }))
    }

    dispatch({ type: FETCH_DATA_REQUEST });
    const { type } = params;
    const { productIds } = params;

    if (type == "loggedIn") {

      try {
        const user = getState().auth.user;
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/cart/${productIds}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: user.token ? `Bearer ${user.token}` : "",
              token: user.token ? user.token : "",
            },
          }
        );


        if (res.data.success) {
          removeCartItems(productIds)

          dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
          return res
        }
      } catch (error) {
        dispatch({ type: FETCH_DATA_FAILURE, error: "Failed to fetch data" });
      }
    } else {
      removeCartItems(productIds)
    }
  };

const updateCartThunk = (
  params: UpdateCartParams
): ThunkAction<void, RootState, undefined, DataActionTypes> =>
    async (dispatch, getState) => {
    const updateCartItems = (productId: string,quantity: number) => {
      dispatch(updateCart({
        id: productId,
        quantity
      }))
    }

    dispatch({ type: FETCH_DATA_REQUEST });
    const { type, productId, quantity} = params;

    if (type == "loggedIn") {

      try {
        const user = getState().auth.user;
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/cart`,
          {
            productId,
            quantity
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: user.token ? `Bearer ${user.token}` : "",
              token: user.token ? user.token : "",
            },
          }
        );

        if (res.data.success) {
          updateCartItems(productId, quantity)

          dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
          return res
        }
      } catch (error) {
        dispatch({ type: FETCH_DATA_FAILURE, error: "Failed to fetch data" });
      }
    } else {
      updateCartItems(productId, quantity)
    }
  }

export { addToCartThunk, removeFromCartThunk, updateCartThunk };
