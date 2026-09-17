import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { banners } from "../data/banners";

const navItems = [["Home","/"],["Categories","/categories"],["Shop","/shop"],["Offers","/offers"],["Special","/specials"],["Build Your Kitchen","/build-kitchen"]];

export default function Header(){
 const {cartCount,wishlist}=useShop(); const [open,setOpen]=useState(false); const [q,setQ]=useState(""); const navigate=useNavigate();
 const submitSearch=e=>{e.preventDefault();navigate(`/shop${q.trim()?`?search=${encodeURIComponent(q.trim())}`:""}`);setOpen(false)};
 const openAccount=()=>navigate(localStorage.getItem("kk-auth")==="true"?"/account":"/login");
 return <header className="site-header">
  <div className="top-strip"><span>🚚 Free Delivery on orders above ₹999</span><span>🔥 Up to 40% Off on Bestsellers</span><span>↩ Easy Returns & 7 Days Replacement</span></div>
  <div className="utility-strip d-none d-md-flex"><span></span><span>Track Order &nbsp; | &nbsp; Need Help? &nbsp; | &nbsp; Store Locator</span></div>
  <div className="main-header container-fluid">
   <Link to="/" className="brand"><img src={banners.logo} alt="KitchenKart"/></Link>
   <form className="search" onSubmit={submitSearch}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search for products..."/><button aria-label="Search"><FiSearch/></button></form>
   <div className="header-actions"><Link to="/wishlist" className="head-action"><span className="icon-wrap"><FiHeart/>{wishlist.length>0&&<b>{wishlist.length}</b>}</span><small>Wishlist</small></Link><Link to="/cart" className="head-action"><span className="icon-wrap"><FiShoppingCart/>{cartCount>0&&<b>{cartCount}</b>}</span><small>Cart</small></Link><button type="button" onClick={openAccount} className="head-action head-action-button"><span className="icon-wrap"><FiUser/></span><small>Account</small></button></div>
   <button className="mobile-toggle d-lg-none" onClick={()=>setOpen(v=>!v)}>{open?<FiX/>:<FiMenu/>}</button>
  </div>
  <nav className={`main-nav ${open?"open":""}`}><div className="container nav-inner">{navItems.map(([label,path])=><NavLink key={path} to={path} end={path==="/"} onClick={()=>setOpen(false)}>{label}</NavLink>)}</div></nav>
 </header>;
}
