import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";
import { banners } from "../data/banners";
import BenefitsBar from "../components/BenefitsBar";
const cards=[
 ["Sustainable Kitchen Picks",banners.specialsEco,"/shop"],
 ["Hot Deals Every Day!",banners.specialsDeals,"/shop"],
 ["New In This Week",banners.specialsNew,"/shop"],
 ["Smart Combos Big Savings!",banners.specialsCombos,"/offers"]
];
const collections=[
 ["Essential Cookware","Everything you need to start cooking","/shop?category=Cookware","/src/assets/special-collection-cookware-visual.jpg"],
 ["Smart Kitchen Tools","Tools that make cooking easy","/shop?category=Kitchen%20Tools","/src/assets/special-collection-tools-visual.jpg"],
 ["Dining Essentials","Serve in style, every time","/shop?category=Utensils","/src/assets/special-collection-dining-visual.jpg"],
 ["Storage Solutions","Keep your kitchen organized","/shop?category=Storage%20%26%20Containers","/src/assets/special-collection-storage-visual.jpg"],
 ["Modern Appliances","Upgrade to a smarter kitchen","/shop?category=Kitchen%20Appliances","/src/assets/special-collection-appliances-visual.jpg"]
]
export default function SpecialsPage(){const [subscribed,setSubscribed]=useState(false);return <div className="page-wrap specials-page"><div className="container specials-heading"><h1>Specials Just for You <span>♡</span></h1><p>Handpicked collections, deals & services to make your cooking experience better every day.</p></div><div className="container special-cards">{cards.map(([t,img,to])=><Link to={to} className="special-card" key={t} aria-label={t}><img src={img} alt={t}/></Link>)}</div><BenefitsBar support/><section className="container section"><div className="section-title"><h2>Shop by Collections</h2><Link to="/categories" className="text-action">View All Collections →</Link></div><div className="collection-grid">{collections.map(([t,desc,to,img])=><Link to={to} key={t} className="collection-card" aria-label={`${t} - Shop Now`}><div className="collection-image"><img src={img} alt={t}/></div><div className="collection-copy"><strong>{t}</strong><span>{desc}</span><small>Shop Now →</small></div></Link>)}</div></section><div className="container specials-promos"><Link to="/shop" className="wide-promo" aria-label="Discover Now"><img src={banners.specialsPersonalized} alt="Personalized Picks - Discover Now"/></Link><Link to="/offers" className="wide-promo" aria-label="Explore Gifts"><img src={banners.specialsGift} alt="Gift Happiness - Explore Gifts"/></Link><button className="wide-promo referral" aria-label="Refer Now" onClick={()=>{navigator.clipboard?.writeText(location.origin+"/ref/KK-FRIEND");alert("Referral link created!")}}><img src={banners.specialsRefer} alt="Refer & Earn - Refer Now"/></button></div><div className="container newsletter"><div><strong>Never Miss a Special Offer!</strong><span>Subscribe to get the latest deals, new arrivals & kitchen tips</span></div><form onSubmit={e=>{e.preventDefault();setSubscribed(true)}}><input required type="email" placeholder="Enter your email"/><button>Subscribe</button></form><div className="follow"><span>Follow us</span><a href="#facebook"><FaFacebookF/></a><a href="#instagram"><FaInstagram/></a><a href="#youtube"><FaYoutube/></a><a href="#pinterest"><FaPinterestP/></a></div></div>{subscribed&&<div className="toast-message" onClick={()=>setSubscribed(false)}>Subscribed successfully ✓</div>}<BenefitsBar/></div>}
