import { useState } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { banners } from "../data/banners";
import { useNavigate } from "react-router-dom";
import BenefitsBar from "../components/BenefitsBar";

export default function LoginPage(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [remember,setRemember]=useState(true); const navigate=useNavigate();
 const login=e=>{e.preventDefault(); if(!email.trim()||!password.trim()) return; localStorage.setItem("kk-auth","true"); if(remember)localStorage.setItem("kk-email",email); navigate("/",{replace:true});};
 return <div className="page-wrap login-page"><div className="container breadcrumb">Home <span>›</span> Login</div><div className="container login-layout">
  <div className="login-visual"><img src={banners.login} alt="Welcome Back"/></div>
  <form className="login-card" onSubmit={login}><h1>Login</h1><p>Welcome back! Please login to your account.</p>
   <label>Email Address</label><div className="input-icon"><FiMail/><input required type="email" placeholder="Enter your email address" value={email} onChange={e=>setEmail(e.target.value)}/></div>
   <div className="label-row"><label>Password</label><button type="button">Forgot Password?</button></div><div className="input-icon"><FiLock/><input required type="password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)}/></div>
   <label className="remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> Remember Me</label>
   <button className="primary-btn w-100" type="submit">Login</button><div className="or">or continue with</div>
   <div className="social-row"><button type="button"><FaGoogle/> Continue with Google</button><button type="button"><FaFacebookF/> Continue with Facebook</button></div>
   <div className="signup">Don't have an account? <button type="button">Sign Up</button></div>
  </form>
 </div><BenefitsBar login/></div>;
}
