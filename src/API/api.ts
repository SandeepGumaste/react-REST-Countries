import axios from "axios";

const baseURL = "https://restcountries.com/v3.1/";

export const fetchAllCountries = async () => {
  const url = `${baseURL}all`;
  const res: any = await axios.get(url);
  return res;
};

export const fetchByRegion = async (region: string) => {
  const url = `${baseURL}region/${region}`;
  const res: any = await axios.get(url);
  return res;
};

export const fetchCountryByName = async (name: string) => {
  const url = `${baseURL}name/${name}?fullText=true`;
  const res: any = await axios.get(url);
  return res;
};
