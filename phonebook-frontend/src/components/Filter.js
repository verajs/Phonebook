import React from "react";

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <div>
    <h2>filter shown with:</h2>
    <input value={newFilter} onChange={handleFilter} />
    </div>
  )
};

export default Filter;
