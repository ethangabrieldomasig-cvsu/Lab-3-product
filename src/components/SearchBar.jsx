import { Search, RotateCcw } from "lucide-react";
import "./SearchBar.css";

function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClearFilters
}) {
  return (
    <section className="search-panel" aria-label="Product search and filters">
      <div className="search-field">
        <Search size={19} aria-hidden="true" />
        <input
          type="search"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />
      </div>

      <label className="filter-field">
        <span>Category</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="School Supplies">School Supplies</option>
          <option value="Accessories">Accessories</option>
        </select>
      </label>

      <label className="filter-field">
        <span>Sort by</span>
        <select value={sortOrder} onChange={(event) => onSortChange(event.target.value)}>
          <option value="default">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </label>

      <button className="clear-button" type="button" onClick={onClearFilters}>
        <RotateCcw size={16} />
        Clear Filters
      </button>
    </section>
  );
}

export default SearchBar;