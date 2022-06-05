import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useParams, useNavigate } from "react-router-dom";

import { fetchCountryByName } from "../API/api";
import { useSelector } from "react-redux";
import { currentTheme } from "../store/selectors/selectors";
import { ImSpinner9 } from "react-icons/im";
import { Country as CountryType } from "../Types/types";

const Country = () => {
  const { name } = useParams();
  const [countryData, setCountryData] = useState<any>(null);
  const [currency, setCurrency] = useState<string | null>(null);
  const [allCountries, setAllCountries] = useState<any | null>(null);
  const [languages, setLanguages] = useState<string | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[] | null>(null);
  const darkTheme = useSelector(currentTheme);
  const navigate = useNavigate();
  useEffect(() => {
    const getCountry = async (name: string) => {
      try {
        setCountryData(null);
        const res = await fetchCountryByName(name);
        if (res.data) {
          setCountryData(res.data[0]);
        }
      } catch (error) {
        window.location.replace("/country/404");
      }
    };
    if (name) {
      try {
        getCountry(name);
      } catch (error) {
        window.location.replace("/country/404");
      }
    } else window.location.replace("/country/404");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    const allCountriesString = localStorage.getItem("allCountries");
    if (allCountriesString) {
      const acData = JSON.parse(allCountriesString);
      setAllCountries(acData);
    }
  }, []);

  useEffect(() => {
    if (countryData && countryData.currencies) {
      const currencies = [...Object.values(countryData.currencies)].map(
        (currency: any) => currency.name
      );
      setCurrency(currencies.join(", "));
    }
    if (countryData && countryData.languages) {
      const allLanguages = [...Object.values(countryData.languages)];
      setLanguages(allLanguages.join(", "));
    }

    if (allCountries && countryData && countryData.borders) {
      const currentBorderCountries = countryData.borders.map(
        (border: string) => {
          return allCountries.filter(
            (country: CountryType) => country.cca3 === border
          )[0].name.common;
        }
      );
      setBorderCountries(currentBorderCountries);
    }
  }, [allCountries, countryData]);

  return (
    <div className="m-auto mt-3 px-8" style={{ maxWidth: "1400px" }}>
      {countryData ? (
        <div>
          <div
            className={`flex items-center justify-center w-24 py-2 font-medium rounded-sm shadow-md ${
              darkTheme ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
            }`}
            onClick={() => {
              navigate("/");
            }}
          >
            <BiArrowBack />
            <span className="ml-3">Back</span>
          </div>
          <div
            className={`mt-8 w-full justify-between flex flex-col lg:flex-row ${
              darkTheme ? " text-white" : " text-gray-900"
            }`}
          >
            <img
              src={countryData.flags.svg}
              className="shadow-md"
              style={{ maxWidth: "600px" }}
              alt="flg"
            />
            <div className="flex w-full flex-col text-xl lg:ml-10">
              <p className=" font-bold text-3xl lg:text-4xl mt-3 lg:mt-0">
                {countryData.name.common}
              </p>
              <div className="flex flex-col lg:flex-row mt-5">
                <div className="lg:mr-10">
                  <p className="font-semibold">
                    Official name:
                    <span className="font-normal">{` ${countryData.name.official}`}</span>
                  </p>
                  <p className="font-semibold pt-2">
                    Population:
                    <span className="font-normal">{` ${countryData.population}`}</span>
                  </p>
                  <p className="font-semibold pt-2">
                    Region:{" "}
                    <span className="font-normal">{` ${countryData.region}`}</span>
                  </p>
                  <p className="font-semibold pt-2">
                    Subregion:{" "}
                    <span className="font-normal">{` ${
                      countryData.subregion
                        ? countryData.subregion
                        : "Not Available"
                    }`}</span>
                  </p>
                  <p className="font-semibold pt-2">
                    Capital:{" "}
                    <span className="font-normal">{` ${
                      countryData.capital
                        ? countryData.capital
                        : "Not Available"
                    }`}</span>
                  </p>
                </div>
                <div className="mt-2 lg:mt-0">
                  <p className="font-semibold">
                    Top level domain:
                    <span className="font-normal">{` ${countryData.tld.join(
                      ", "
                    )}`}</span>
                  </p>
                  <p className="font-semibold  pt-2">
                    Currencies:
                    <span className="font-normal">{` ${
                      currency ? currency : "Not Available"
                    }`}</span>
                  </p>
                  <p className="font-semibold pt-2">
                    Languages:
                    <span className="font-normal">
                      {languages ? ` ${languages}` : " Not Available"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items=center pt-2">
                <p className="font-semibold min-w-max">Border countries:</p>
                <div className="flex flex-wrap lg:ml-3">
                  {borderCountries && borderCountries?.length > 0
                    ? borderCountries?.map((bc: string, index: number) => (
                        <div
                          className={`flex items-center justify-center px-4 py-1 ml-3 mt-2 rounded-sm shadow-md text-base ${
                            darkTheme
                              ? "bg-gray-700 text-white"
                              : "bg-gray-50 text-gray-900"
                          }`}
                          onClick={() => {
                            navigate(`/country/${bc}`);
                          }}
                          key={index}
                        >
                          {bc}
                        </div>
                      ))
                    : "No border countries"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-full h-96 flex flex-col justify-center items-center ${
            darkTheme ? "text-white" : "text-gray-900"
          }`}
        >
          <ImSpinner9 className="h-16 w-16 animate-spin" />
          <p className="mt-5 text-xl font-bold">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Country;
