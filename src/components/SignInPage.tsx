import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const heading = "Sign In";
  const description = "Sign in to your account";
  const ifAccount = "Do not Have An Account? ";
  const createAccountMsg = "Create Account";
  const buttonMessage = "Sign In";

  return (
    <div className="fullPage2">
      <div className="loginpage-content">
        <div className="information">
          <h1>{heading}</h1>
          <p>{description}</p>
        </div>

        <form>
          <div className="inputs">
            <input type="email" className="email" placeholder="Email Address" />
            <input
              type="password"
              className="password"
              placeholder="Password"
            />
          </div>
        </form>

        <button type="submit" className="signInbutton">
          Sign In
        </button>

        <p className="HaveAccount">
          {ifAccount}
          {/* <a href="https://www.google.com" className="sign-in-link"> */}
          <Link to="/createaccount" className="sign-in-link">
            {createAccountMsg}
          </Link>
          {/* </a> */}
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
