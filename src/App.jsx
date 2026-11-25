import { useState } from "react";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import ProductCard from "./components/ProductCard.jsx";
import products from "./data/products.js";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  function handleAddToCart(productTitle) {
    setCartCount((count) => count + 1);
    setLastAdded(productTitle);
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
            <p>{products.length} products available in the catalog</p>
          </div>
          <span className="catalog-count">{products.filter((product) => product.inStock).length} in stock</span>
        </div>

        <div className="product-grid">
          {products.map((product) => (
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
      </section>

      <footer>Made for DCIT26 · React Props and Component Communication</footer>
    </main>
  );
}

export default App;