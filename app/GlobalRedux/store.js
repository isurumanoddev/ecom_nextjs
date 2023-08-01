'use client'

import { configureStore } from "@reduxjs/toolkit";
import basketReducer from '@/app/GlobalRedux/Features/basket/basketSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
