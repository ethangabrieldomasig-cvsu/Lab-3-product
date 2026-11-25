import "./ProductCard.css";

function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children
}) {
  return (
    <article className={`product-card ${inStock ? "" : "product-card--out"}`}>
      <div className="product-card__top">
        <span className="product-card__category">{category}</span>
        {children}
      </div>

      <div className="product-card__icon" aria-hidden="true">
        {category === "Books" ? "📚" : category === "School Supplies" ? "📓" : category === "Accessories" ? "🎒" : "⌨️"}
      </div>

      <h2>{title}</h2>
      <p className="product-card__price">
        {price.toLocaleString("en-PH", {
          style: "currency",
          currency: "PHP",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </p>

      <div className="product-card__bottom">
        <span className={`stock-label ${inStock ? "stock-label--in" : "stock-label--out"}`}>
          <span className="stock-dot" />
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
        <button
          className="add-button"
          type="button"
          disabled={!inStock}
          onClick={() => onAddToCart(title)}
        >
          {inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;