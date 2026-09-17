import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { banners } from "../data/banners";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import BenefitsBar from "../components/BenefitsBar";

const cats=["All Offers","Cookware","Kitchen Tools","Utensils","Storage & Containers","Kitchen Appliances","Spice Organizers","Bottles & Lunch Boxes","Cleaning & Organizers"];

export default function OffersPage(){
  const [filters,setFilters]=useState({});
  const [sort,setSort]=useState("popularity");
  const [cat,setCat]=useState("All Offers");
  const {addToCart}=useShop();

  const data=useMemo(()=>{
    let d=products.filter(p=>p.discount>=15);

    // Top offer-category chips
    if(cat!=="All Offers") d=d.filter(p=>p.category===cat);

    // Same filter rules used by the Shop page
    if(filters.categories?.length){
      d=d.filter(p=>filters.categories.includes(p.category));
    }
    if(filters.brands?.length){
      d=d.filter(p=>filters.brands.includes(p.brand));
    }
    if(filters.material?.length){
      d=d.filter(p=>filters.material.includes(p.material));
    }
    if(filters.ratings?.length){
      const minRating=Math.min(...filters.ratings.map(r=>Number.parseInt(r,10)));
      d=d.filter(p=>p.rating>=minRating);
    }
    if(filters.maxPrice != null && filters.maxPrice < 10000){
      d=d.filter(p=>p.price<=filters.maxPrice);
    }

    if(sort==="price-low") d.sort((a,b)=>a.price-b.price);
    if(sort==="price-high") d.sort((a,b)=>b.price-a.price);
    if(sort==="rating") d.sort((a,b)=>b.rating-a.rating);
    return d;
  },[cat,filters,sort]);

  const dealProducts=[products[10],products[0],products[2],products[8],products[14]].filter(Boolean);
  const [dealIndex,setDealIndex]=useState(0);
  const [seconds,setSeconds]=useState(8*3600+45*60+32);
  const deal=dealProducts[dealIndex]||products[0];

  useEffect(()=>{
    const rotate=setInterval(()=>setDealIndex(i=>(i+1)%dealProducts.length),6000);
    const tick=setInterval(()=>setSeconds(s=>s>0?s-1:8*3600+45*60+32),1000);
    return()=>{clearInterval(rotate);clearInterval(tick)};
  },[]);

  const hh=String(Math.floor(seconds/3600)).padStart(2,"0");
  const mm=String(Math.floor((seconds%3600)/60)).padStart(2,"0");
  const ss=String(seconds%60).padStart(2,"0");

  return <div className="page-wrap offers-page">
    <div className="container breadcrumb">Home <span>›</span> Offers</div>
    <div className="container image-hero offers-reference-hero">
      <img src={banners.offersHero} alt="Up to 40% off"/>
      <Link aria-label="Shop All Offers" to="/specials" className="image-hotspot offers-shop-all-hotspot"/>
    </div>

    <div className="container chip-row wide-chips">
      {cats.map(x=><button key={x} className={cat===x?"active":""} onClick={()=>setCat(x)}>{x}</button>)}
    </div>

    <div className="container listing-layout offers-layout">
      <FilterSidebar filters={filters} setFilters={setFilters}/>
      <div className="listing-main">
        <div className="list-toolbar">
          <span>Showing {data.length} offers</span>
          <label>Sort by: <select value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select></label>
        </div>

        <div className="product-grid">
          {data.map(p=><ProductCard key={p.id} product={p}/>)}
        </div>
        {data.length===0 && <div className="empty-state">No offers match your filters.</div>}
      </div>

      <aside className="deal-sidebar">
        <div className="deal-day">
          <div className="deal-day-head">
            <Link to={`/product/${deal.id}`} className="deal-title">Deal of the Day</Link>
            <span aria-live="polite">{hh} : {mm} : {ss}</span>
          </div>
          <Link to={`/product/${deal.id}`} className="deal-product-link">
            <img src={deal.image} alt={deal.name}/>
            <h4>{deal.name}</h4>
            <strong>₹{deal.price.toLocaleString("en-IN")}</strong>
          </Link>
          <div className="deal-actions">
            <Link to={`/product/${deal.id}`} className="deal-view-btn">View Deal →</Link>
            <button onClick={()=>addToCart(deal)}>Add to Cart</button>
          </div>
        </div>
        <div className="side-promo"><img src={banners.prepaid} alt="Extra 10% Off"/></div>
      </aside>
    </div>
    <BenefitsBar/>
  </div>;
}
