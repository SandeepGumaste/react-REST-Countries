import React, { useEffect, useState } from "react";
import { fetchAllCountries, fetchByRegion } from "../API/api";
import CountryCard from "../Components/countryCard";
import { useNavigate } from "react-router-dom";
import { Country, CountryNameType } from "../Types/types";
import { useSelector } from "react-redux";
import { currentTheme } from "../store/selectors/selectors";
import RegionSelector from "../Components/regionSelector";
import SearchBar from "../Components/searchBar";
import { useParams } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

const Home = () => {
  const [countriesData, setCountriesData] = useState<undefined | any>(
    undefined
  );
  const [allCountriesOriginal, setAllCountriesOriginal] = useState<
    undefined | any
  >(undefined);
  const { filter } = useParams();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const darkTheme = useSelector(currentTheme);
  const navigate = useNavigate();
  const countriesByRegion = async (filter: string) => {
    setCountriesData(undefined);
    try {
      const { data } = await fetchByRegion(filter);
      setCountriesData(data);
    } catch (error) {
      navigate("/region/404");
    }
  };

  useEffect(() => {
    if (filter) {
      setSelectedRegion(filter);
    }
    if (filter && filter !== "all") {
      countriesByRegion(filter);
    } else {
      setCountriesData(allCountriesOriginal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, allCountriesOriginal]);

  useEffect(() => {
    if (searchTerm) {
      setSelectedRegion("");
      const searchList = allCountriesOriginal.filter(
        ({ name }: { name: CountryNameType }) =>
          name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setCountriesData(searchList);
    } else {
      setCountriesData(allCountriesOriginal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    const initializeData = async (setData?: boolean) => {
      try {
        const { data } = await fetchAllCountries();
        setAllCountriesOriginal(data);
        localStorage.setItem("allCountries", JSON.stringify(data));
        if (setData !== false) {
          setCountriesData(data);
        }
      } catch (error) {
        window.location.replace("/no-connection");
      }
    };
    if (!allCountriesOriginal) {
      initializeData();
    } else {
      setCountriesData(allCountriesOriginal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`top-0  ${darkTheme ? "bg-gray-800" : "bg-gray-200"}`}>
      <div
        className=" flex justify-between m-auto flex-col lg:flex-row px-8 py-3 "
        style={{ maxWidth: "1400px" }}
      >
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          darkTheme={darkTheme}
        />
        <div className="py-4"></div>
        <RegionSelector selectedRegion={selectedRegion} darkTheme={darkTheme} />
      </div>
      {countriesData ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto pb-24`}
          style={{ maxWidth: "1400px" }}
        >
          {countriesData.map((country: Country, index: number) => {
            return (
              <CountryCard
                country={country}
                darkTheme={darkTheme}
                key={index}
              />
            );
          })}
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

export default Home;
