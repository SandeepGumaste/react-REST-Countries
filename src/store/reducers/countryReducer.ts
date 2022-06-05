import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country } from "../../Types/types";

const initialState: any = {
  countries: undefined,
};

export const allCountriesSlice = createSlice({
  name: "selectedCountry",
  initialState,
  reducers: {
    allCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { allCountries } = allCountriesSlice.actions;
