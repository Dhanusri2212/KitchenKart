import { Link } from "react-router-dom";
import { categories } from "../data/products";
import { banners } from "../data/banners";
import CategoryCard from "../components/CategoryCard";
import BenefitsBar from "../components/BenefitsBar";
export default function CategoriesPage(){return <div className="page-wrap categories-page"><section className="container image-hero category-reference-hero"><img src={banners.categoryHero} alt="Make Every Meal A Little Better"/><Link className="category-image-hotspot cat-shop" to="/shop" aria-label="Shop Now"></Link><Link className="category-image-hotspot cat-build" to="/build-kitchen" aria-label="Build Your Kitchen"></Link></section><section className="container section categories-section"><div className="section-title"><div><div className="eyebrow">SHOP BY</div><h2>CATEGORIES</h2></div><Link to="/shop" className="text-action">VIEW ALL CATEGORIES →</Link></div><div className="category-grid large">{categories.map(c=><CategoryCard key={c.name} category={c}/>)}</div></section><BenefitsBar/></div>}
