import { useState } from "react";
import { MagnifyingGlass } from "phosphor-react";

const SearchBar = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <div className="relative text-gray-600">
      <input
        type="search"
        name="search"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchChange}
        className="w-full py-2 pl-10 pr-4 rounded-lg shadow focus:outline-none focus:shadow-outline"
      />
      <div className="absolute top-0 left-0 mt-2 ml-3">
        <MagnifyingGlass size={20} />
      </div>
    </div>
  );
};

export default SearchBar;
