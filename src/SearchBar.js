import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios";
import { API_URL, Api_options } from "./api";
const SearchBar = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const handleOnChange = (dateSearched) => {
    setSearch(dateSearched);
    onSearchChange(dateSearched);
    //
  };
  const loadOptions = (inputValue) => {
    return (async () => {
      try {
        const response = await axios.get(
          `${API_URL}/cities?minPopulation=4000&limit=10&namePrefix=${inputValue}`,
          Api_options
        );
        const options = response.data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`
        }));
        return { options };
      } catch (error) {
        console.error("API Error:", error);
        return { options: [] }; // Return an empty array or handle error as needed
      }
    })();
  };
  return (
    <AsyncPaginate
      placeholder="Search"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      perPage={10}
    />
  );
};
export default SearchBar;
