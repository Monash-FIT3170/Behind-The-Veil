import React, { useState } from "react";

const FilterLocationSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  //Sample locationd ata
  const customerLocationSuburbAll = [
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Stockholm",
  ];

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const results = customerLocationSuburbAll.filter((location) =>
        location.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredLocations(results);
    } else {
      setFilteredLocations([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredLocations.map((location, index) => (
          <li key={index}>{location}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterLocationSearchBar;
