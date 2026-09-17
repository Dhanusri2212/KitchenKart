import { Link } from "react-router-dom";
import { FiCheckCircle, FiUser } from "react-icons/fi";

export default function AccountPage() {
  return (
    <div className="account-message-page page-wrap">
      <div className="container account-message-card">
        <div className="account-message-icon"><FiCheckCircle /></div>
        <h1>You have already logged in</h1>
        <p>Your KitchenKart account is already active on this browser.</p>
        <div className="account-actions">
          <Link to="/" className="primary-btn">Continue Shopping</Link>
          <Link to="/wishlist" className="secondary-btn"><FiUser /> My Wishlist</Link>
        </div>
      </div>
    </div>
  );
}
