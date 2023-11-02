import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import customIcons from "../../../Icons/icons";
import "./login.css";

const Login = ({ onLogin }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://saharadeskrestapi.azurewebsites.net/api/Auth",
        {
          userName,
          password,
        }
      );

      const bearerToken = response.data.bearerToken;

      const user = response.data;

      const claims = response.data.claims;

      localStorage.setItem("claims", JSON.stringify(claims));

     
      localStorage.setItem("token", bearerToken);
      

      localStorage.setItem("userInfo",JSON.stringify(user));


      onLogin();
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="mainLoginContainer">
        <div className="saharaLogo">
            <img src="https://149862670.v2.pressablecdn.com/wp-content/uploads/2022/11/SaharaDesk-Logo.png" alt="sahara logo"/>
        </div>
      <div className="mainLogin">
        <div className="mainLoginContent">
          <span className="mainLoginUserIcon">
            <customIcons.user size={100} style={{ color: "#E7E7E7", marginBottom: "35px" }} />
          </span>
          <div className="mainLoginInputContainer">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mainLoginInputContainer">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mainLoginRememberAccess">
            <div className="remember">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                value="Boat"
              />
              <lable for="rememberMe"> remember me</lable>
            </div>
            <Link to="">forgot password?</Link>
          </div>
          <button onClick={handleLogin} className="mainLoginSubmit">Login</button>

          <div className="mainLoginCreate">
            <div>
            <p>Dont have account?</p>
            <button>Create account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
