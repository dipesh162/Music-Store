import { createSlice } from '@reduxjs/toolkit'

type cartState = {
  cart: Product[]
}

type Product = {
  productId: string;
  quantity: number;
}

const initialState = {
  cart: []
} as cartState

export const cart = createSlice({
    name: 'cartInfo',
    initialState,
    reducers: {
      addToCart: (state, action) => {
        let cart = state.cart
        const isUnique = !cart.some(item => item.productId === action.payload.productId);
        if(isUnique){
          cart = [...cart,action.payload]
          state.cart = cart
        }
      },
      removeFromCart: (state, action) => {
        let cart = state.cart
        let idsToRemove = action.payload.ids
        const newCart = cart.filter(item => !idsToRemove.includes(item.productId));
        state.cart = newCart
      },
      updateCart: (state, action) => {
        let cart = state.cart
        let itemToUpdateId = action.payload.id
        let quantity = action.payload.quantity
        let itemIndex = cart.findIndex((item)=> item.productId == itemToUpdateId)
        cart[itemIndex] = {
          productId : itemToUpdateId,
          quantity
        }
        state.cart = cart
      },
      emptyCart: (state) => {
        state.cart = initialState.cart
      }
    },
    extraReducers: (builder) => {
      builder
        // extra reducers here using builder callback notation
        // .addCase(someAction.type, (state, action) => {
        //   // reducer logic
        // })
        // .addCase(anotherAction.type, (state, action) => {
        //   // reducer logic
        // });
    }
})

export const {
  addToCart,
  removeFromCart,
  updateCart,
  emptyCart
} = cart.actions

export default cart.reducer