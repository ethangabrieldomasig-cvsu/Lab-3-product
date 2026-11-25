import { useEffect, useMemo, useState } from "react";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import ProductCard from "./components/ProductCard.jsx";
import SearchBar from "./components/SearchBar.jsx";
import products from "./data/products.js";

function App() {
  // Search and filter state
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Cart state from Laboratory Exercise 3
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Debounce search input by 300ms. Cleanup cancels older timers.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Derive the visible products without changing the original array.
  const filteredProducts = useMemo(() => {
    const keyword = debouncedSearch.trim().toLowerCase();

    const matchingProducts = products.filter((product) => {
      const matchesKeyword = product.title.toLowerCase().includes(keyword);
      const matchesCategory = category === "All" || product.category === category;
      return matchesKeyword && matchesCategory;
    });

    const sortedProducts = [...matchingProducts];

    if (sortOrder === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    return sortedProducts;
  }, [debouncedSearch, category, sortOrder]);

  // Update browser tab title whenever the result count changes.
  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

  function handleAddToCart(productTitle) {
    setCartCount((count) => count + 1);
    setLastAdded(productTitle);
  }

  function handleClearFilters() {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark"><ShoppingBag size={22} /></div>
          <div>
            <p className="eyebrow">CAVITE STATE UNIVERSITY</p>
            <h1>CvSU Mini Store</h1>
          </div>
        </div>
        <div className="header-cart" aria-label={`Cart items: ${cartCount}`}>
          <ShoppingCart size={19} />
          <span>{cartCount}</span>
        </div>
      </header>

      <section className="intro">
        <p className="eyebrow">PRODUCT CATALOG</p>
        <h2>Find what you need.</h2>
        <p>Browse our selection of school and everyday essentials.</p>
      </section>

      <section className="cart-status" aria-live="polite">
        <div className="cart-status__icon"><ShoppingCart size={20} /></div>
        {cartCount === 0 ? (
          <p><strong>Your cart is empty.</strong> Add an available product to get started.</p>
        ) : (
          <p>
            <strong>Items added to cart: {cartCount}</strong>
            <span> (Last added: {lastAdded})</span>
          </p>
        )}
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <h2>Our Products</h2>
            <p>Search, filter, and sort the catalog</p>
          </div>
          <span className="catalog-count">{products.length} total products</span>
        </div>

        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClearFilters={handleClearFilters}
        />

        <p className="result-count" aria-live="polite">
          Showing <strong>{filteredProducts.length}</strong> of {products.length} products
        </p>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                category={product.category}
                inStock={product.inStock}
                onAddToCart={handleAddToCart}
              >
                {product.id === 1 && <span className="product-badge product-badge--new">New</span>}
                {product.id === 5 && <span className="product-badge product-badge--sale">Popular</span>}
              </ProductCard>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">🔎</div>
            <h3>No products found.</h3>
            <p>Try a different keyword or category.</p>
            <button className="clear-button" type="button" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <footer>Made for DCIT26 · React useState and useEffect</footer>
    </main>
  );
}

export default App;