import { Link } from "react-router-dom";
import { products, categories } from "../data/products";
import { banners } from "../data/banners";
import ProductCard from "../components/ProductCard";
import BenefitsBar from "../components/BenefitsBar";

export default function HomePage(){
 const categoryTargets=categories;
 return <div className="page-wrap home-page">
  <section className="container image-hero home-reference-hero"><img src={banners.homeHero} alt="Everything Your Kitchen Deserves"/><Link aria-label="Shop Now" to="/shop" className="image-hotspot home-shop-hotspot"/><Link aria-label="Explore Categories" to="/categories" className="image-hotspot home-categories-hotspot"/><Link aria-label="Shop Offers" to="/offers" className="image-hotspot home-offers-hotspot"/></section>
  <section className="container category-strip">{categoryTargets.map(c=><Link to={`/category/${encodeURIComponent(c.name)}`} key={c.name}><span><img src={c.image} alt=""/></span><b>{c.name}</b></Link>)}</section>
  <section className="container section home-bestsellers"><div className="section-title"><div><div className="eyebrow">BEST SELLERS</div><h2>BEST SELLERS</h2></div><Link to="/shop" className="text-action">View All →</Link></div><div className="home-feature-row"><div className="dream-banner"><img src={banners.bestSellerBuild} alt="Build your dream kitchen"/><Link aria-label="Build your kitchen now" to="/build-kitchen" className="image-hotspot dream-build-hotspot"/></div><div className="product-grid home-products">{products.slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</div></div></section>
  <section className="container home-promo-grid"><Promo img={banners.homeDealDay} to="/shop" label="SHOP NOW" hotspotClass="deal-shop-hotspot"/><Promo img={banners.homeNewArrivals} to="/specials" label="EXPLORE NOW" hotspotClass="new-arrivals-hotspot"/><Promo img={banners.specialsCombos} to="/offers" label="SHOP COMBO" hotspotClass="combo-hotspot"/></section>
  <BenefitsBar/>
 </div>
}
function Promo({img,to,label,hotspotClass}){return <div className="reference-promo"><img src={img} alt=""/><Link aria-label={label} to={to} className={`image-hotspot ${hotspotClass}`}/></div>}
