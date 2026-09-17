import { FiHeart, FiShare2 } from "react-icons/fi";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import BenefitsBar from "../components/BenefitsBar";

export default function WishlistPage(){
 const {wishlist,wishlistTotal,toggleWishlist,addToCart}=useShop();
 const items=wishlist;
 const isEmpty=items.length===0;

 return <div className="page-wrap wishlist-page">
  <div className="container breadcrumb">Home <span>›</span> Wishlist</div>
  <div className="container wishlist-heading">
   <div>
    <h1>♡ My Wishlist ({wishlist.length})</h1>
    <p>Your favorite items, all in one place.</p>
   </div>
   {!isEmpty && <label>Sort by: <select><option>Recently Added</option></select></label>}
  </div>

  {isEmpty ? (
   <div className="container wishlist-empty-state">
    <div className="wishlist-empty-icon"><FiHeart /></div>
    <h2>Your Wishlist is Empty</h2>
    <p>You haven't added any products to your wishlist yet.</p>
    <a className="primary-btn wishlist-shop-btn" href="/shop">Continue Shopping →</a>
   </div>
  ) : (
   <div className="container wishlist-layout">
    <section>
     <div className="wishlist-grid">{items.map(p=><ProductCard key={p.id} product={p}/>)}</div>
    </section>
    <aside className="wishlist-summary">
     <h2>Wishlist Summary</h2>
     <div className="big-count">{wishlist.length} Items <strong>₹{wishlistTotal.toLocaleString("en-IN")}</strong></div>
     <button className="primary-btn w-100" onClick={()=>items.forEach(p=>addToCart(p))}>🛒 Add All to Cart</button>
     <button className="secondary-btn w-100"><FiShare2/> Share Wishlist</button>
     <hr/>
     <h3>You May Also Like</h3>
     {products.slice(8,11).map(p=><div className="recommend" key={p.id}><img src={p.image} alt=""/><span>{p.name}</span><b>₹{p.price.toLocaleString("en-IN")}</b></div>)}
     <button className="text-action">View More Recommendations →</button>
    </aside>
   </div>
  )}
  <BenefitsBar/>
 </div>
}
