import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FiGrid, FiList, FiSliders, FiShoppingCart } from "react-icons/fi";
import { products } from "../data/products";
import { banners } from "../data/banners";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import BenefitsBar from "../components/BenefitsBar";
import { useShop } from "../context/ShopContext";

const categoryHeroMap = {
  "Cookware": "/src/assets/product-category-common-banner.jpeg",
  "Kitchen Tools": "/src/assets/product-category-common-banner.jpeg",
  "Utensils": "/src/assets/product-category-common-banner.jpeg",
  "Storage & Containers": "/src/assets/product-category-common-banner.jpeg",
  "Kitchen Appliances": "/src/assets/product-category-common-banner.jpeg",
  "Spice Organizers": "/src/assets/product-category-common-banner.jpeg",
  "Bottles & Lunch Boxes": "/src/assets/product-category-common-banner.jpeg",
  "Cleaning & Organizers": "/src/assets/product-category-common-banner.jpeg"
};

const categoryCopy = {
  "Cookware": "Cook delicious meals with premium cookware built for everyday cooking.",
  "Kitchen Tools": "Smart tools that make chopping, slicing and cooking easier every day.",
  "Utensils": "Serve in style with practical dining essentials for every meal.",
  "Storage & Containers": "Keep ingredients fresh, organized and easy to reach.",
  "Kitchen Appliances": "Upgrade your kitchen with modern appliances made for smarter cooking.",
  "Spice Organizers": "Keep every spice neat, visible and ready to use.",
  "Bottles & Lunch Boxes": "Carry meals and drinks with dependable everyday essentials.",
  "Cleaning & Organizers": "Simple organizers and cleaning helpers for a tidier kitchen."
};

function CategoryListingHero({ title }) {
  const image = categoryHeroMap[title] || banners.categoryHero;
  const copy = categoryCopy[title] || `Discover premium ${title.toLowerCase()} for your kitchen.`;
  const featuredProduct = products.find(p => p.category === title);
  const { addToCart } = useShop();
  return <div className="listing-category-heading">
    <div className="listing-category-copy">
      <span className="listing-category-kicker">KITCHEN COLLECTION</span>
      <h1>{title}</h1>
      <p>{copy}</p>
      <div className="listing-category-actions">
        <span className="listing-category-link">Explore collection <b>→</b></span>
        {featuredProduct && <button type="button" className="listing-banner-cart" onClick={() => addToCart(featuredProduct)}>
          <FiShoppingCart /> Add to Cart
        </button>}
      </div>
    </div>
    <div className="listing-category-visual"><img src={image} alt={`${title} collection`} /><span className="listing-category-badge">CURATED FOR YOU</span></div>
  </div>;
}

export default function ListingPage({ allProducts = false }) {
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "";
  const categoryFilter = queryParams.get("category") || "";
  const decodedCategory = category ? decodeURIComponent(category) : "";
  const [filters, setFilters] = useState(() => categoryFilter ? { categories: [categoryFilter] } : {});
  const [sort, setSort] = useState("popularity");
  const [mobileFilter, setMobileFilter] = useState(false);

  useEffect(() => {
    if (categoryFilter) {
      setFilters(prev => ({ ...prev, categories: [categoryFilter] }));
    }
  }, [categoryFilter]);

  const list = useMemo(() => {
    let data = [...products];
    if (!allProducts && decodedCategory) data = data.filter(p => p.category === decodedCategory);
    if (allProducts && categoryFilter) data = data.filter(p => p.category === categoryFilter);
    if (search) data = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    // On a category route, the URL category is already the active category.
    // Category checkboxes remain useful on the main Shop page without cancelling the route.
    if (allProducts && filters.categories?.length) data = data.filter(p => filters.categories.includes(p.category));
    if (filters.brands?.length) data = data.filter(p => filters.brands.includes(p.brand));
    if (filters.material?.length) data = data.filter(p => filters.material.includes(p.material));
    if (filters.ratings?.length) {
      const minRating = Math.min(...filters.ratings.map(r => Number.parseInt(r, 10)));
      data = data.filter(p => p.rating >= minRating);
    }
    if (filters.maxPrice) data = data.filter(p => p.price <= filters.maxPrice);
    if (sort === "price-low") data.sort((a,b)=>a.price-b.price);
    if (sort === "price-high") data.sort((a,b)=>b.price-a.price);
    if (sort === "rating") data.sort((a,b)=>b.rating-a.rating);
    return data;
  }, [allProducts, decodedCategory, categoryFilter, search, filters, sort]);

  const title = allProducts ? (categoryFilter || "Shop All Products") : (decodedCategory || "Cookware");
  return <div className="page-wrap listing-page">
    <div className="container breadcrumb">Home <span>›</span> {allProducts ? "Shop" : title}</div>
    <div className="container listing-layout">
      <button className="filter-mobile d-lg-none" onClick={()=>setMobileFilter(v=>!v)}><FiSliders/> Filters</button>
      <div className={mobileFilter ? "filter-mobile-wrap show" : "filter-mobile-wrap"}><FilterSidebar filters={filters} setFilters={setFilters}/></div>
      <div className="listing-main">
        {!allProducts ? (
          <CategoryListingHero title={title} />
        ) : (
          <div className="shop-heading-inline"><h1>{categoryFilter || "Shop All Products"}</h1><p>{categoryFilter ? `Discover kitchen essentials in ${categoryFilter}.` : "Discover 652+ kitchen essentials for your home"}</p></div>
        )}
        <div className="list-toolbar"><span>Showing 1-{Math.min(list.length, 12)} of {list.length} products</span><label>Sort by: <select value={sort} onChange={e=>setSort(e.target.value)}><option value="popularity">Popularity</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Rating</option></select></label><FiGrid className="toolbar-icon active"/><FiList className="toolbar-icon"/></div>
        <div className="product-grid">{list.slice(0, 12).map(p=><ProductCard key={p.id} product={p}/>)}</div>
        {list.length === 0 && <div className="empty-state">No products match your filters.</div>}
        
      </div>
    </div>
    <BenefitsBar />
  </div>;
}