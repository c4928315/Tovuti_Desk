import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/Forms/LoginForm/loginForm";
import SignUpForm from "../../Components/Forms/SignUpForm/signUpForm";
import useFetch from "../../Hooks/useFetch";
import "./login.css";

function Login() {
  const { isLoading } = useFetch("https://intra-deco.onrender.com/incidents");
  const [loginForm, setLoginForm] = useState(true);

  const handleClick = () => {
    loginForm ? setLoginForm(false) : setLoginForm(true);
  };

  return (
    <div className="loginPage">
      <div className="loginPageLeft">
        <div className="loginLogo">
          <img
            src="https://i.postimg.cc/GmBW7q01/Tovuti-Logo-removebg-preview.png"
            alt="company logo"
            className="companyLogoImg"
          />
        </div>

        <h3 className="loginHeroContent">
          What goes on four legs in the morning, on two legs at noon and on
          three legs in the evening.
        </h3>

        <div className="copyRight">
          <p>&copy; 2023 All rights reserved By Kpine Designs. Unless Indicated Otherwise</p>
        </div>
      </div>
      <div className="loginPageRight">
        {loginForm ? <LoginForm /> : <SignUpForm />}
        { 
         !isLoading ? <div>
         <p>
           {loginForm ? (
             <div className="mainAccessOptions">
               <p>Don't have an account</p>
               <Link onClick={handleClick}>create account</Link>
             </div>
           ) : (
             <div className="mainAccessOptions">
               <p>already have an account</p>
               <Link onClick={handleClick}>sign in</Link>
             </div>
           )}
         </p>
       </div> : null
        }
      </div>
    </div>
  );
}

export default Login;
