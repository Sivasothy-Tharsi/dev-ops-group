import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlices';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});