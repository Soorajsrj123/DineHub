import { combineReducers, configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "../Slices/userSlice";
import ownerReducer from "../Slices/ownerSlice";
import dishReducer from "../Slices/dishSlice";
import RestaurantSearchReducer from "../Slices/RestaurantSlice";
// USING PERSIST FOR STORING THE REDUX STATE IN LOCALSTORAGE
const persistConfig1 = {
  key: 1,
  version: 1,
  storage,
};
const persistConfig2 = {
  key: 2,
  version: 1,
  storage,
};

const persistConfig3 = {
  key: 3,
  version: 1,
  storage,
};
const persistConfig4 = {
  key: 4,
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig1, userReducer),
  owner: persistReducer(persistConfig2, ownerReducer),
  dishes: persistReducer(persistConfig3, dishReducer),
  restaurant: persistReducer(persistConfig4, RestaurantSearchReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
