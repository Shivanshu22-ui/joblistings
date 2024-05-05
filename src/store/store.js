import { configureStore } from "@reduxjs/toolkit";
import jobListingReducer from './listing.slice';

export const store = configureStore({
  reducer: {
    jobListing:jobListingReducer,
  },
});
