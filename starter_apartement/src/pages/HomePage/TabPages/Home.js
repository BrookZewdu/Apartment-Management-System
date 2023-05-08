import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cardsState, loggedInUserState } from "../../../recoil_state";
import HouseCard from "../components/HouseCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { X } from "phosphor-react";
import {
  getApartments,
  getApartment,
  deleteApartment,
  updateApartment,
} from "../../../services/apartmentService";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [houses, setHouses] = useState([]);
  const [user, setUser] = useRecoilState(loggedInUserState);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await getApartments();
        const data = response.data;
        console.log("response: ", data);
        setHouses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHouses();
    setLoading(false);
  }, []);

  const handleSearchChange = (value) => {
    setPage(1);
    setSearchValue(value);
  };

  const filteredHouses = houses.filter((house) => {
    if (
      !searchValue ||
      (house.description + house.name)
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  const totalHouses = filteredHouses.length;
  const totalPages = houses.length > 0 ? Math.ceil(totalHouses / pageSize) : 0;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleHouses = filteredHouses.slice(startIndex, endIndex);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-3xl font-bold text-neutral">Welcome</h2>
      <div className="mb-4">
        <SearchBar onSearchChange={handleSearchChange} />
      </div>
      <div className="flex flex-col space-y-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          visibleHouses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Home;
