import { Country } from "../Types/types";
import { useNavigate } from "react-router-dom";
const CountryCard = ({
  country,
  darkTheme,
}: {
  country: Country;
  darkTheme: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`mx-8 mt-8 flex flex-col justify-between cursor-pointer items-start rounded-sm overflow-hidden shadow-sm ${
        darkTheme ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
      }`}
      onClick={() => {
        navigate(`/country/${country.name.common}`);
      }}
    >
      <div className="w-full">
        <img
          src={country.flags.svg}
          className=" object-cover h-40 w-full overflow-hidden"
          alt="flag"
        />
      </div>
      <div className="px-4 py-3 flex flex-col justify-start items-start w-full h-48">
        <p className=" font-bold text-lg">{country.name.common}</p>
        <p className="font-semibold text-lg pt-2">
          Population:
          <span className="font-normal">{` ${country.population}`}</span>
        </p>
        <p className="font-semibold text-lg">
          Region: <span className="font-normal">{` ${country.region}`}</span>
        </p>
        <p className="font-semibold text-lg">
          Capital:{" "}
          <span className="font-normal">{` ${
            country.capital ? country.capital : "Not Available"
          }`}</span>
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
