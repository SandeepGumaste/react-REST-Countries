import { RootState } from "../types";

export const currentTheme = (state: RootState) => state.toggleTheme.dark;
export const allCountries = (state: RootState) =>
  state.allCountriesSlice.countries;
