import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product, compact = false }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const openProduct = () => navigate(`/product/${product.id}`);

  return (
    <article
      className={`product-card ${compact ? "compact" : ""}`}
      role="link"
      tabIndex={0}
      onClick={openProduct}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProduct(); } }}
      style={{ cursor: "pointer" }}
      aria-label={`View ${product.name}`}
    >
      <div className="product-image-wrap">
        <span className="discount">{product.discount}% OFF</span>
        <button className={`wish-btn ${isWishlisted(product.id) ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}>
          <FiHeart />
        </button>
        <div className="product-image-link">
          <img src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <h3>{product.name}</h3>
        <div className="rating">★ {product.rating} <span>({product.reviews})</span></div>
        <div className="price-row">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          <del>₹{product.mrp.toLocaleString("en-IN")}</del>
          <em>{product.discount}% OFF</em>
        </div>
        {!compact ? (
          <button className="add-cart" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
            <FiShoppingCart /> Add to Cart
          </button>
        ) : (
          <button className="mini-add" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add</button>
        )}
      </div>
    </article>
  );
}
