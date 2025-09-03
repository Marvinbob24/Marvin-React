import React from "react";

const Filters = ({ sortType, filterCategory, handleSort, handleCategoryFilter }) => {
  return (
    <div className="filters">
      <div className="sort-section">
        <label>Sort by: </label>
        <select value={sortType} onChange={(e) => handleSort(e.target.value)}>
          <option value="">Select</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>
      <div className="category-section">
        <label>Category: </label>
        <select
          value={filterCategory}
          onChange={(e) => handleCategoryFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Tennis">Tennis</option>
          <option value="Accessories">Accessories</option>
          <option value="Fan Art">Fan Art</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
