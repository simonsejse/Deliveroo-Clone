import { configureStore } from '@reduxjs/toolkit';

import basketReducer from './slices/features/basketSlice';
import restaurantReducer from './slices/features/restaurantSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});

// I
