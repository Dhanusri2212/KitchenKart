import { FiMinus, FiPlus, FiTrash2, FiLock, FiTruck, FiShield, FiRotateCcw } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import BenefitsBar from "../components/BenefitsBar";

export default function CartPage(){
 const {cart,cartSubtotal,updateQty,removeFromCart,clearCart}=useShop();
 const discount=Math.round(cartSubtotal*0.08); const total=Math.max(0,cartSubtotal-discount);
 return <div className="page-wrap cart-page">
  <div className="container breadcrumb">Home <span>›</span> Shopping Cart</div>
  <div className="container cart-heading"><h1>Your Shopping Cart 🛒</h1><span>{cart.reduce((s,i)=>s+i.qty,0)} Items in your cart</span></div>
  <div className="container cart-layout">
   <section className="cart-table"><div className="cart-head"><span>Product</span><span>Price</span><span>Quantity</span><span>Total</span></div>
   {cart.length===0?<div className="empty-state"><h2>Your cart is empty</h2><Link className="primary-btn" to="/shop">Start Shopping</Link></div>:cart.map(item=><div className="cart-row" key={item.id}><div className="cart-product"><img src={item.image} alt=""/><div><strong>{item.name}</strong><small>{item.category}</small></div></div><b>₹{item.price.toLocaleString("en-IN")}</b><div className="qty"><button onClick={()=>updateQty(item.id,item.qty-1)}><FiMinus/></button><span>{item.qty}</span><button onClick={()=>updateQty(item.id,item.qty+1)}><FiPlus/></button></div><b>₹{(item.price*item.qty).toLocaleString("en-IN")}</b><button className="delete" onClick={()=>removeFromCart(item.id)}><FiTrash2/></button></div>)}
   {cart.length>0&&<div className="cart-actions"><Link to="/shop" className="secondary-btn">← Continue Shopping</Link><button onClick={clearCart}>Clear Cart</button></div>}</section>
   <aside className="order-summary"><h2>Order Summary</h2><div><span>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} Items)</span><b>₹{cartSubtotal.toLocaleString("en-IN")}</b></div><div className="discount-line"><span>Discount</span><b>- ₹{discount.toLocaleString("en-IN")}</b></div><div><span>Delivery Charges</span><b>FREE</b></div><div className="saved"><span>🎁 You Saved</span><b>₹{discount.toLocaleString("en-IN")}</b></div><hr/><div className="grand"><span>Total Amount<br/><small>(inclusive of all taxes)</small></span><strong>₹{total.toLocaleString("en-IN")}</strong></div><button className="primary-btn w-100">Proceed to Checkout</button><button className="secondary-btn w-100">Buy Now</button><div className="summary-benefits"><p><FiLock/> <b>100% Secure Payments</b><small>Your payments are safe with us</small></p><p><FiRotateCcw/> <b>7 Days Easy Returns</b><small>Hassle-free returns & refunds</small></p><p>💵 <b>Cash on Delivery</b><small>Pay when you receive your order</small></p><p><FiShield/> <b>Dedicated Support</b><small>We're here to help you 24/7</small></p></div></aside>
  </div>
  <BenefitsBar support/>
 </div>
}