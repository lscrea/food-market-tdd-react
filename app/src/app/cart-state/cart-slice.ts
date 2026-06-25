import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  addItem as addItemDomain,
  cartItemCount,
  cartTotal,
  emptyCart,
  removeItem as removeItemDomain,
  updateQuantity as updateQuantityDomain,
  type Cart,
} from '../../core/cart/domain/cart';
import type { Product } from '../../core/product/domain/product';

type CartState = { cart: Cart };

const initialState: CartState = { cart: emptyCart() };

const slice = createSlice({
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

    removed: (state, action: PayloadAction<string>) => {
      state.cart = removeItemDomain(state.cart, action.payload);
    },

    quantityUpdated: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      state.cart = updateQuantityDomain(state.cart, action.payload.productId, action.payload.quantity);
    },

    cleared: (state) => {
      state.cart = emptyCart();
    },
  },
});

export const cartActions = slice.actions;
export const cartReducer = slice.reducer;

type RootStateWithCart = { cart: CartState };

export const selectCartItems = (state: RootStateWithCart) => state.cart.cart.items;
export const selectCartTotal = (state: RootStateWithCart) => cartTotal(state.cart.cart);
export const selectCartItemCount = (state: RootStateWithCart) => cartItemCount(state.cart.cart);
