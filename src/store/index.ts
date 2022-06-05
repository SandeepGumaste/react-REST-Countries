import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./reducers/themeReducer";
import { allCountriesSlice } from "./reducers/countryReducer";

const store = configureStore({
  reducer: {
    toggleTheme: themeSlice.reducer,
    allCountriesSlice: allCountriesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
