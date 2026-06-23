// src/cart-slice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CartItem = { id: string; name: string; price: number; quantity: number };
type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    added: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);   // mutation OK (Immer sous le capot)
    },
    removed: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { added, removed } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;