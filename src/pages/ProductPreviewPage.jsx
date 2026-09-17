import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiHeart, FiMinus, FiPlus, FiShoppingCart, FiTruck, FiRotateCcw, FiLock } from "react-icons/fi";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import BenefitsBar from "../components/BenefitsBar";

export default function ProductPreviewPage() {
  const { id } = useParams();
  const product = useMemo(
    () => products.find(p => String(p.id) === String(id)) || products[0],
    [id]
  );
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("details");

  const description = product.description ||
    `Upgrade your kitchen with the ${product.name}. This ${product.category.toLowerCase()} essential is designed for practical everyday use, easy handling and reliable performance.`;

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Use the same common kitchen banner for every product category.
  const commonCategoryBanner = "/src/assets/product-category-common-banner.jpeg";
  const categoryShowcase = {
    "Cookware": { image: commonCategoryBanner, description: "Explore premium cookware designed for everyday cooking." },
    "Kitchen Tools": { image: commonCategoryBanner, description: "Smart kitchen tools that make everyday cooking easier." },
    "Utensils": { image: commonCategoryBanner, description: "Serve in style with practical dining and serving essentials." },
    "Storage & Containers": { image: commonCategoryBanner, description: "Keep your kitchen organized with smart storage solutions." },
    "Kitchen Appliances": { image: commonCategoryBanner, description: "Upgrade your kitchen with modern cooking appliances." },
    "Spice Organizers": { image: commonCategoryBanner, description: "Keep your spices neat, accessible and beautifully organized." },
    "Bottles & Lunch Boxes": { image: commonCategoryBanner, description: "Practical storage, hydration and lunch essentials for every day." },
    "Cleaning & Organizers": { image: commonCategoryBanner, description: "Useful kitchen organizers and cleaning essentials for a tidy space." }
  };
  const showcase = categoryShowcase[product.category] || {
    image: commonCategoryBanner,
    description: `Explore premium ${product.category.toLowerCase()} designed for everyday kitchen use.`
  };

  return (
    <div className="page-wrap product-preview-page">
      <div className="container breadcrumb">
        <Link to="/">Home</Link><span>›</span>
        <Link to={`/category/${encodeURIComponent(product.category)}`}>{product.category}</Link><span>›</span>
        <span>{product.name}</span>
      </div>

      {/* Product preview: large product image on the left, complete product information on the right */}
      <section className="container product-preview-hero">
        <div className="preview-gallery">
          <div className="preview-thumbs">
            {[product, ...related.slice(0, 3)].map((item, i) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className={`preview-thumb-link ${i === 0 ? "active" : ""}`}
                aria-label={`View ${item.name}`}
              >
                <img src={item.image} alt={item.name} />
              </Link>
            ))}
          </div>
          <div className="preview-image">
            <span className="preview-badge">{product.discount >= 20 ? `${product.discount}% OFF` : "BESTSELLER"}</span>
            <button
              type="button"
              className={`preview-heart ${isWishlisted(product.id) ? "active" : ""}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Add to wishlist"
            >
              <FiHeart />
            </button>
            <img src={product.image} alt={product.name} loading="eager" />
          </div>
        </div>

        <div className="preview-info">
          <span className="eyebrow">{product.brand} • {product.category}</span>
          <h1>{product.name}</h1>
          <div className="preview-rating">★ {product.rating} <span>({product.reviews} reviews)</span></div>

          <div className="preview-price">
            <strong>₹{product.price.toLocaleString("en-IN")}</strong>
            <del>₹{product.mrp.toLocaleString("en-IN")}</del>
            <em>{product.discount}% OFF</em>
          </div>
          <p className="tax-note">Inclusive of all taxes</p>

          <div className="preview-divider" />
          <h3 className="preview-section-label">About this product</h3>
          <p className="preview-description">{description}</p>

          <div className="offer-box">
            <div>
              <b>Special offer</b>
              <span>Get ₹100 off on this product with KKBAN.</span>
            </div>
            <Link to="/offers">View Offers →</Link>
          </div>

          <div className="quantity-row">
            <span>Quantity</span>
            <div>
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}><FiMinus /></button>
              <b>{qty}</b>
              <button type="button" onClick={() => setQty(qty + 1)}><FiPlus /></button>
            </div>
          </div>

          <div className="preview-buttons">
            <button className="secondary-btn" type="button" onClick={() => toggleWishlist(product)}>
              <FiHeart /> {isWishlisted(product.id) ? "Wishlisted" : "Add to Wishlist"}
            </button>
            <button className="primary-btn preview-cart" type="button" onClick={() => addToCart(product, qty)}>
              <FiShoppingCart /> Add to Cart
            </button>
          </div>

          <div className="preview-benefit-list">
            <div><span className="preview-benefit-icon">✓</span><b>100% Original</b><span>Genuine product</span></div>
            <div><FiTruck /><b>Free Delivery</b><span>On orders above ₹999</span></div>
            <div><FiRotateCcw /><b>Easy Returns</b><span>7 day replacement</span></div>
            <div><FiLock /><b>Secure Payment</b><span>100% safe checkout</span></div>
          </div>
        </div>
      </section>

      {/* Related items are shown immediately below the selected product. */}
      <section className="container product-related-section">
        <div className="category-related-heading">
          <div>
            <span>RELATED ITEMS</span>
            <h2>More from {product.category}</h2>
            <p className="related-subtitle">Explore products related to {product.name}</p>
          </div>
          <Link to={`/category/${encodeURIComponent(product.category)}`}>View All →</Link>
        </div>
        <div className="category-related-products">
          {related.map(item => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>

      {/* Category banner stays below the related items and matches the selected category. */}
      <section className="container product-category-showcase">
        <div className="product-category-banner">
          <div className="product-category-banner-copy">
            <span>SHOP BY CATEGORY</span>
            <h2>{product.category}</h2>
            <p>{showcase.description}</p>
            <Link to={`/category/${encodeURIComponent(product.category)}`} className="category-shop-btn">Explore {product.category} →</Link>
          </div>
          <div className="product-category-banner-image">
            <img
              src={showcase.image}
              alt={`${product.category} collection`}
            />
          </div>
        </div>
      </section>

      <section className="container preview-tabs">
        <div className="tab-buttons">
          {[["details", "Product Details"], ["spec", "Specifications"], ["reviews", `Reviews (${product.reviews})`], ["faq", "FAQ"]].map(([key, label]) => (
            <button key={key} type="button" className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>
        <div className="tab-content">
          {tab === "details" && (
            <>
              <h3>Product Details</h3>
              <p>{description}</p>
              <ul>
                <li>Designed for practical everyday kitchen use.</li>
                <li>Easy handling with reliable performance.</li>
                <li>KitchenKart quality assurance and secure packaging.</li>
              </ul>
            </>
          )}
          {tab === "spec" && (
            <>
              <h3>Specifications</h3>
              <div className="product-spec-grid">
                {product.tabMeta.specs.map(([label,value]) => <div className="product-spec-row" key={label}><b>{label}</b><span>{value}</span></div>)}
              </div>
            </>
          )}
          {tab === "reviews" && (
            <>
              <h3>Customer Reviews</h3>
              <div className="product-review-list">
                {product.tabMeta.reviews.map(([name,rating,text]) => <article className="product-review" key={name}><div className="review-top"><b>{name}</b><span>★ {rating}</span></div><p>{text}</p></article>)}
              </div>
            </>
          )}
          {tab === "faq" && (
            <>
              <h3>Frequently Asked Questions</h3>
              <div className="product-faq-list">
                {Array.from({length: product.tabMeta.faq.length/2}, (_,i) => <div className="product-faq" key={i}><b>{product.tabMeta.faq[i*2]}</b><p>{product.tabMeta.faq[i*2+1]}</p></div>)}
              </div>
            </>
          )}
        </div>
      </section>

      <BenefitsBar />
    </div>
  );
}
