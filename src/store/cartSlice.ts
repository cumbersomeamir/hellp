import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  showViewCart: boolean;
}

const initialState: CartState = {
  items: [],
  showViewCart: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({productId, quantity: 1});
      }
      
      state.showViewCart = true;
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.items.find(item => item.productId === productId);
      
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.items.find(item => item.productId === productId);
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.productId !== productId);
          if (state.items.length === 0) {
            state.showViewCart = false;
          }
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
      
      if (state.items.length === 0) {
        state.showViewCart = false;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.showViewCart = false;
    },
    hideViewCart: (state) => {
      state.showViewCart = false;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  hideViewCart,
} = cartSlice.actions;

export default cartSlice.reducer;
