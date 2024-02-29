import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../userForm.css";
import Card from "../Card/Card";
import useSubmitHandler from "../useSubmitHandler";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { submitHandler } = useSubmitHandler("signin");
  const navigate = useNavigate();

  return (
    <Card>
      <h1>SIGN IN</h1>
      <form className="user-form">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="signup-btn"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            submitHandler({ username: email, password });
          }}
        >
          SIGN IN
        </button>
        {/* </Link> */}
        <p>
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </span>
        </p>
      </form>
    </Card>
  );
}

export default Signin;
