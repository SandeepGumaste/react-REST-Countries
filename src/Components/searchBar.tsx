import React from "react";
import { BiSearch } from "react-icons/bi";
interface IProps {
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  darkTheme: boolean;
}
const SearchBar = ({ setSearchTerm, searchTerm, darkTheme }: IProps) => {
  const onChange = (term: string) => {
    setSearchTerm(term);
  };
  return (
    <div>
      <div
        className={`flex justify-start items-center px-3 py-2 w-72 text-lg rounded-sm ${
          darkTheme ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <BiSearch className=" h-8 w-8" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onChange(e.target.value)}
          className="pl-3 border-0 w-full bg-transparent outline-none"
          placeholder="Search for a country..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
