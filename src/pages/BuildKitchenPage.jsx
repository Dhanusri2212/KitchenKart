import { Link, useNavigate } from "react-router-dom";
import { FiCheck, FiShoppingCart, FiHelpCircle, FiHome, FiGrid, FiList, FiShoppingBag } from "react-icons/fi";
import { banners } from "../data/banners";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const steps=[[FiHome,"Choose Kitchen Type"],[FiGrid,"Select Your Essentials"],[FiList,"Review Your Kitchen"],[FiShoppingBag,"Add to Cart & Checkout"]];
const kitchenTypes=[
  {name:"Modern Kitchen", image:"/src/assets/kitchen-modern.png", desc:"Modern, stylish & customizable"},
  {name:"Compact Kitchen", image:"/src/assets/kitchen-compact.jpeg", desc:"Perfect for small spaces"},
  {name:"Open Kitchen", image:"/src/assets/kitchen-open.jpeg", desc:"Spacious & perfect for modern homes"},
  {name:"Traditional Kitchen", image:"/src/assets/kitchen-traditional.jpeg", desc:"Classic design & timeless appeal"},
  {name:"Premium Kitchen", image:"/src/assets/kitchen-premium.png", desc:"High-end luxury experience"}
];
export default function BuildKitchenPage(){
 const navigate=useNavigate();
 const picks=products.slice(0,8);
 return <div className="page-wrap build-page">
  <div className="container breadcrumb">Home <span>›</span> Build Your Kitchen</div>
  <section className="container image-hero build-reference-hero">
   <img src={banners.buildHero} alt="Build Your Dream Kitchen"/>
   <button aria-label="Start building your kitchen" className="image-hotspot build-start-hotspot" onClick={()=>navigate("/build-kitchen/wizard")}/>
  </section>
  <div className="container build-steps reference-steps">
   {steps.map(([Icon,label],i)=><div key={label}><span className="step-icon"><Icon/></span><b>{i+1}</b><span>{label}</span>{i<3&&<i>→</i>}</div>)}
  </div>
  <div className="container build-benefits">
   <span><FiCheck/> Handpicked Products</span><span><FiCheck/> Best Value Combos</span><span><FiCheck/> Quality Assured</span><span><FiCheck/> Easy Returns</span>
  </div>
  <section className="container build-content">
   <div className="build-left">
    <h2>1. Choose Kitchen Type</h2>
    <div className="kitchen-types">
     {kitchenTypes.map((item,i)=><button key={item.name} className={i===0?"selected":""} onClick={()=>navigate(`/build-kitchen/wizard?type=${encodeURIComponent(item.name)}`)}>
      <img src={item.image} alt={item.name}/><strong>{item.name}</strong><span>{item.desc}</span>
     </button>)}
    </div>
    <div className="help-box"><FiHelpCircle/><span><b>Need Help?</b> Our expert will help you build the perfect kitchen</span><button onClick={()=>alert("Our kitchen expert will contact you shortly.")}>Book a Free Consultation</button></div>
   </div>
   <div className="build-products">
    <div className="build-section-head"><h2>2. Select Your Essentials</h2><span>Sort by: Popularity</span></div>
    <div className="product-grid builder-grid">{picks.map(p=><ProductCard key={p.id} product={p} compact/>)}</div>
    <button type="button" className="primary-btn build-start-btn" onClick={()=>navigate("/build-kitchen/wizard")}>Start Building →</button>
   </div>
   <aside className="kitchen-summary">
    <div className="summary-head"><h2>3. Your Kitchen Summary</h2><button type="button">Clear All</button></div>
    {picks.slice(0,5).map(p=><div className="summary-item" key={p.id}><img src={p.image} alt=""/><span>{p.name}</span><b>₹{p.price.toLocaleString("en-IN")}</b></div>)}
    <hr/><small>Estimated Total</small><strong className="summary-total">₹17,095</strong><em>You save ₹6,104 on this selection!</em>
    <Link to="/cart" className="primary-btn"><FiShoppingCart/> Add to Cart</Link>
   </aside>
  </section>
 </div>
}
