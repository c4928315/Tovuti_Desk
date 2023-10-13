import React from "react";
import "./signUpForm.css"
import { Link } from "react-router-dom";
import customIcons from "../../../Icons/icons";

function SignUpForm() {
  return (
    <div className="loginForm">
      <div className="loginLogoContainer">
        <img
          src="https://i.postimg.cc/GmBW7q01/Tovuti-Logo-removebg-preview.png"
          alt="company logo"
          className="companyLogoImg companyLogoImgTop"
        />
      </div>

      <div className="loginFormGreetings">
        <h3>Sign Up</h3>
        <h5>Creact An Account And Start Your 1 month Free Trial Today.</h5>
      </div>
      <form class="formMd">
        <div class="formGroup">
          <input id="form_name1" class="formControl" type="text" required />
          <label for="form_name1">name</label>
        </div>

        <div class="formGroup">
          <input id="email" class="formControl" type="email" required />
          <label for="email">email</label>
        </div>

        <div class="formGroup">
          <input
            id="form_name2"
            class="formControl"
            type="password"
            placeholder=""
            required
          />
          <label for="form_name2">password</label>
        </div>

        <div class="formGroup">
          <input
            id="confirm_password"
            class="formControl"
            type="password"
            placeholder=""
            required
          />
          <label for="confirm_password">confirm password</label>
        </div>

        <button type="submit" className="loginBtn">
          SignUp
        </button>
      </form>

      {/* <div className="forgotLink">
        <Link>
          <p>forgot password?</p>
        </Link>
      </div> */}

      <div className="accessAltSignUp">
        <div className="accessAltSignUpBlock1">
          <Link className="accessAltLinks">
            <span className="accessAltLinksSpan signUpGoogle">
              <customIcons.google size="20" />
              <p>signUp with google</p>
            </span>
          </Link>
        </div>

        <div className="accessAltSignUpBlock2">
          <Link className="accessAltLinks">
            <span className="accessAltLinksSpan signUpFacebook facebook">
              <customIcons.facebook size="20" />
              <p>signUp with facebook</p>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
