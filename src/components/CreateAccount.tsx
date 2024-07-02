import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");

  const heading = "Create An Account";
  const description =
    "Create an account to enjoy all the services without any ads for free!";
  const ifAccount = "Already Have An Account? ";
  const signInMsg = "Sign In";
  const navigate = useNavigate();

  const emailValidation = () => {
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regEx.test(email)) {
      navigate("/signin");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailValidation();
  };

  return (
    <div className="fullPage1">
      <div className="loginpage-content">
        <div className="information">
          <h1>{heading}</h1>
          <p>{description}</p>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="inputs">
            <input
              type="email"
              className="email"
              placeholder="Email Address"
              value={email}
              onChange={handleOnChange}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="createAccountButton">
            Create Account
          </button>
        </form>

        <p className="HaveAccount">
          {ifAccount}
          <Link to="/signin" className="sign-in-link">
            {signInMsg}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountPage;
