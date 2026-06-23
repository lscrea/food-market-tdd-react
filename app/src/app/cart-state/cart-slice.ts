// src/cart-slice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../core/product/domain/product';
import {
  addItem as addItemDomain,
  emptyCart,
  type Cart,
} from '../../core/cart/domain/cart';

type CartState = { cart: Cart };
const initialState: CartState = { cart: emptyCart() };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    added: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      state.cart = addItemDomain(
        state.cart,
        action.payload.product,
        action.payload.quantity ?? 1,
      );
    },

  },
});

export const { added } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;