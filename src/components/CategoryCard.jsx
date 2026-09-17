import { Link } from "react-router-dom";
export default function CategoryCard({category}){return <Link className="category-card" to={`/category/${encodeURIComponent(category.name)}`}><div className="category-image"><img src={category.image} alt={category.name}/></div><strong>{category.name}</strong><span>{category.subtitle}</span><small>Explore →</small></Link>}
