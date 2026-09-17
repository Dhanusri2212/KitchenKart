import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import Header from "./components/Header";
import BenefitsBar from "./components/BenefitsBar";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import ListingPage from "./pages/ListingPage";
import ProductPreviewPage from "./pages/ProductPreviewPage";
import OffersPage from "./pages/OffersPage";
import SpecialsPage from "./pages/SpecialsPage";
import BuildKitchenPage from "./pages/BuildKitchenPage";
import KitchenWizardPage from "./pages/KitchenWizardPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";

function Site({ children }) { return <><Header /><main>{children}</main></>; }

export default function App() {
  return <BrowserRouter><ShopProvider><Routes>
    <Route path="/login" element={<Site><LoginPage /></Site>} />
    <Route path="/account" element={<Site><AccountPage /></Site>} />
    <Route path="/" element={<Site><HomePage /></Site>} />
    <Route path="/categories" element={<Site><CategoriesPage /></Site>} />
    <Route path="/category/:category" element={<Site><ListingPage /></Site>} />
    <Route path="/shop" element={<Site><ListingPage allProducts /></Site>} />
    <Route path="/product/:id" element={<Site><ProductPreviewPage /></Site>} />
    <Route path="/offers" element={<Site><OffersPage /></Site>} />
    <Route path="/specials" element={<Site><SpecialsPage /></Site>} />
    <Route path="/build-kitchen" element={<Site><BuildKitchenPage /></Site>} />
    <Route path="/build-kitchen/wizard" element={<Site><KitchenWizardPage /></Site>} />
    <Route path="/cart" element={<Site><CartPage /></Site>} />
    <Route path="/wishlist" element={<Site><WishlistPage /></Site>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></ShopProvider></BrowserRouter>;
}
