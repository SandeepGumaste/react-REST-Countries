import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { fetchAllCountries } from "../API/api";
interface IProps {
  selectedRegion: string | undefined;
  darkTheme: boolean;
}

const RegionSelector = ({ selectedRegion, darkTheme }: IProps) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [allRegions, setAllRegions] = useState<null | string[]>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const allCountriesString = localStorage.getItem("allCountries");
        if (!allCountriesString) {
          const { data } = await fetchAllCountries();
          if (data) {
            let regionsArray: any = [];
            for (let i of data) {
              regionsArray.push(i.region);
            }
            regionsArray = new Set(regionsArray);
            setAllRegions([...regionsArray]);
          }
        } else {
          const data = JSON.parse(allCountriesString);
          let regionsArray: any = [];
          for (let i of data) {
            regionsArray.push(i.region);
          }
          regionsArray = new Set(regionsArray);
          setAllRegions([...regionsArray]);
        }
      } catch (error) {
        window.location.replace("/no-connection");
      }
    };
    initializeData();
  }, []);

  return (
    <div className="transition-all">
      <button
        className={`px-7 py-2 text-lg h-12 w-56 rounded-sm flex justify-between items-center relative capitalize ${
          darkTheme ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
        }`}
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedRegion ? selectedRegion : "Filter By Region"}
        <IoIosArrowDown
          className={`ml-5 transform transition ${
            showOptions ? " rotate-180 " : "rotate-0"
          }`}
        />
      </button>
      {showOptions && (
        <div
          className={`px-7 py-2 text-lg capitalize mt-1 rounded-sm flex flex-col absolute w-56 ${
            darkTheme ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
          }`}
        >
          <p
            onClick={() => {
              navigate(`/region/all`);
              setShowOptions(false);
            }}
            className="cursor-pointer"
          >
            all
          </p>
          {allRegions &&
            allRegions.map((region: string, index: number) => (
              <p
                key={index}
                onClick={() => {
                  navigate(`/region/${region}`);
                  setShowOptions(false);
                }}
                className="cursor-pointer"
              >
                {region}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default RegionSelector;
