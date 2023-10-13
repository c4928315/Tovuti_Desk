import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loginForm.css";
import customIcons from "../../../Icons/icons";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsloading(true)

    let item = { email, password };
    let result = await fetch("https://i-commerce.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });

    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/home", { replace: true });
  };

  return (
    <div className="loginForm">
      {isLoading ? (
        <div class="lazyLoading">
          <div class="sound-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <>
          <div className="loginLogoContainer">
            <img
              src="https://i.postimg.cc/GmBW7q01/Tovuti-Logo-removebg-preview.png"
              alt="company logo"
              className="companyLogoImg companyLogoImgTop"
            />
          </div>

          <div className="loginFormGreetings">
            <h3>Sign In</h3>
            <h5>welcome back to a new session!</h5>
          </div>
          <form class="formMd">
            <div class="formGroup">
              <input
                id="form_name1"
                class="formControl"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="form_name1">email</label>
            </div>

            <div class="formGroup">
              <input
                id="form_name2"
                class="formControl"
                type="password"
                placeholder=""
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="form_name2">password</label>
            </div>

            <button type="submit" className="loginBtn" onClick={handleSubmit}>
              Sign In
            </button>
          </form>

          <div className="forgotLink">
            <Link>
              <p>forgot password?</p>
            </Link>
          </div>

          <div className="accessAlt">
            <Link className="accessAltLinks">
              <span className="accessAltLinksSpan">
                <customIcons.google size="20" />
                <p>signIn with google</p>
              </span>
            </Link>

            <Link className="accessAltLinks">
              <span className="accessAltLinksSpan facebook">
                <customIcons.facebook size="20" />
                <p>signIn with facebook</p>
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default LoginForm;
