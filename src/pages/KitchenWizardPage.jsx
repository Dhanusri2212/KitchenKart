import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { banners } from "../data/banners";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

const kitchenTypes=[
 {name:"Modern Kitchen", image:"/src/assets/kitchen-modern.png", desc:"Modern, stylish & customizable"},
 {name:"Compact Kitchen", image:"/src/assets/kitchen-compact.jpeg", desc:"Perfect for small spaces"},
 {name:"Open Kitchen", image:"/src/assets/kitchen-open.jpeg", desc:"Spacious & perfect for modern homes"},
 {name:"Traditional Kitchen", image:"/src/assets/kitchen-traditional.jpeg", desc:"Classic design & timeless appeal"},
 {name:"Premium Kitchen", image:"/src/assets/kitchen-premium.png", desc:"High-end luxury experience"}
];
const needs=["Cookware","Kitchen Tools","Utensils","Storage & Containers","Kitchen Appliances","Spice Organizers","Bottles & Lunch Boxes","Cleaning & Organizers"];
export default function KitchenWizardPage(){
 const [searchParams]=useSearchParams();
 const initialType=searchParams.get("type");
 const [step,setStep]=useState(1);
 const [type,setType]=useState(()=>kitchenTypes.find(k=>k.name===initialType)||kitchenTypes[0]);
 const [budget,setBudget]=useState("₹10,000 - ₹20,000"); const [selected,setSelected]=useState(products.slice(0,5).map(p=>p.id));
 const {addToCart}=useShop(); const navigate=useNavigate();
 const selectedProducts=useMemo(()=>products.filter(p=>selected.includes(p.id)),[selected]);
 const total=selectedProducts.reduce((s,p)=>s+p.price,0);
 const toggle=id=>setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
 const finish=()=>{selectedProducts.forEach(p=>addToCart(p)); setStep(6);};
 return <div className="page-wrap wizard-page">
  <div className="wizard-progress container">{[1,2,3,4,5,6].map(n=><div className={step>=n?"done":""} key={n}><b>{n}</b><span>{["Choose Your Kitchen Type","Choose Your Kitchen Needs","Set Your Budget","Select Your Essentials","Review Your Kitchen","Added to Cart"][n-1]}</span></div>)}</div>
  {step===1&&<WizardFrame title="Choose Your Kitchen Type" sub="Select the type of kitchen that best fits your space and lifestyle."><div className="wizard-split"><div className="option-grid kitchen-option-grid">{kitchenTypes.map(item=><button type="button" className={type.name===item.name?"selected":""} onClick={()=>setType(item)} key={item.name}><img src={item.image} alt={item.name}/><strong>{item.name}</strong><span>{item.desc}</span></button>)}</div><div className="wizard-preview"><img className="wizard-side-image" src={type.image} alt={type.name}/><div className="wizard-preview-caption"><strong>{type.name}</strong><span>{type.desc}</span></div></div></div><div className="wizard-bottom"><span>🌿 Not sure which one to choose? Take our quick kitchen style quiz!</span><button className="primary-btn" onClick={()=>setStep(2)}>Continue <FiArrowRight/></button></div></WizardFrame>}
  {step===2&&<WizardFrame title="What do you need for your kitchen?" sub="Choose the categories you want in your dream kitchen."><div className="need-grid">{needs.map(n=><button className={selected.some(id=>products.find(p=>p.id===id)?.category===n)?"selected":""} onClick={()=>{const p=products.find(x=>x.category===n); if(p)toggle(p.id)}} key={n}><span>{n}</span><small>✓</small></button>)}</div><div className="wizard-bottom"><button className="secondary-btn" onClick={()=>setStep(1)}>← Back</button><button className="primary-btn" onClick={()=>setStep(3)}>Continue <FiArrowRight/></button></div></WizardFrame>}
  {step===3&&<WizardFrame title="What's your kitchen budget?" sub="Choose a budget range that works for you."><div className="budget-grid">{["Under ₹5,000","₹5,000 - ₹10,000","₹10,000 - ₹20,000","₹20,000 - ₹50,000","Above ₹50,000"].map(x=><button className={budget===x?"selected":""} onClick={()=>setBudget(x)} key={x}>{x}</button>)}</div><div className="budget-recommend">💗 <strong>Most customers choose</strong><span>₹10,000 - ₹20,000</span></div><div className="wizard-bottom"><button className="secondary-btn" onClick={()=>setStep(2)}>← Back</button><button className="primary-btn" onClick={()=>setStep(4)}>Continue <FiArrowRight/></button></div></WizardFrame>}
  {step===4&&<WizardFrame title="Pick the products you need" sub="Choose products for your kitchen."><div className="wizard-products">{products.slice(0,10).map(p=><div key={p.id} className={selected.includes(p.id)?"selected-product":""}><ProductCard product={p} compact/><button onClick={()=>toggle(p.id)}>{selected.includes(p.id)?"Added":"Add"}</button></div>)}</div><div className="wizard-bottom"><button className="secondary-btn" onClick={()=>setStep(3)}>← Back</button><button className="primary-btn" onClick={()=>setStep(5)}>Review Collection <FiArrowRight/></button></div></WizardFrame>}
  {step===5&&<WizardFrame title="Review your kitchen collection" sub="Everything looks good? You can edit your selection before adding it to cart."><div className="review-layout"><div>{selectedProducts.map(p=><div className="review-item" key={p.id}><img src={p.image} alt=""/><span>{p.name}</span><b>₹{p.price.toLocaleString("en-IN")}</b><button onClick={()=>toggle(p.id)}>Remove</button></div>)}</div><aside><small>Total items</small><strong>{selectedProducts.length}</strong><small>Total</small><strong>₹{total.toLocaleString("en-IN")}</strong><button className="primary-btn" onClick={finish}>Add to Cart</button></aside></div></WizardFrame>}
  {step===6&&<WizardFrame title="Added to Cart" sub="All items were added to cart successfully!"><div className="success-state"><div className="success-icon"><FiCheck/></div><h2>Your dream kitchen is one step closer.</h2><p>We've added your selected essentials to the shopping cart.</p><div><button className="secondary-btn" onClick={()=>navigate("/cart")}>View Cart</button><Link to="/shop" className="primary-btn">Continue Shopping</Link></div></div></WizardFrame>}
 </div>
}
function WizardFrame({title,sub,children}){return <div className="container wizard-card"><div className="wizard-title"><h1>{title}</h1><p>{sub}</p></div>{children}</div>}