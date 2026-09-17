import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { products } from "../data/products";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("kk-cart") || "[]"));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("kk-wishlist") || "[]"));
  const [cartToast, setCartToast] = useState(null);

  useEffect(() => {
    if (!cartToast) return;
    const timer = setTimeout(() => setCartToast(null), 2200);
    return () => clearTimeout(timer);
  }, [cartToast]);

  const persist = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      const next = existing
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
        : [...prev, { ...product, qty }];
      persist("kk-cart", next);
      return next;
    });
    setCartToast({ name: product.name, qty });
  };

  const updateQty = (id, qty) => {
    setCart(prev => {
      const next = prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i);
      persist("kk-cart", next);
      return next;
    });
  };

  const removeFromCart = id => {
    setCart(prev => {
      const next = prev.filter(i => i.id !== id);
      persist("kk-cart", next);
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    persist("kk-cart", []);
  };

  const toggleWishlist = product => {
    setWishlist(prev => {
      const exists = prev.some(i => i.id === product.id);
      const next = exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
      persist("kk-wishlist", next);
      return next;
    });
  };

  const isWishlisted = id => wishlist.some(i => i.id === id);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const wishlistTotal = wishlist.reduce((sum, i) => sum + i.price, 0);

  const value = useMemo(() => ({
    products, cart, wishlist, cartCount, cartSubtotal, wishlistTotal,
    addToCart, updateQty, removeFromCart, clearCart, toggleWishlist, isWishlisted, cartToast
  }), [cart, wishlist, cartCount, cartSubtotal, wishlistTotal, cartToast]);

  return <ShopContext.Provider value={value}>
    {children}
    {cartToast && (
      <div className="cart-toast" role="status" aria-live="polite">
        <span className="cart-toast-check">✓</span>
        <div><strong>Added to Cart</strong><small>{cartToast.name}{cartToast.qty > 1 ? ` × ${cartToast.qty}` : ""}</small></div>
      </div>
    )}
  </ShopContext.Provider>;
}

export function useShop() {
  return useContext(ShopContext);
}