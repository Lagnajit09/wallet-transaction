import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../userForm.css";
import Card from "../Card/Card";
import useSubmitHandler from "../useSubmitHandler";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { submitHandler } = useSubmitHandler("signup");

  //   async function signupSubmitHandler(event) {
  //     event.preventDefault();

  //     await axios
  //       .post("http://localhost:3000/api/v1/user/signup", {
  //         firstName,
  //         lastName,
  //         username: email,
  //         password,
  //       })
  //       .then((res) => {
  //         console.log("Response:", res.data);
  //         // res.data.success ? console.log(res.data) : alert(res.data.message);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   }

  return (
    <Card>
      <h1>SIGN UP</h1>
      <form className="user-form">
        <input
          type="text"
          placeholder="Firstname"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lastname"
          onChange={(e) => setLastName(e.target.value)}
        />
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
        {/* <Link
          onClick={(event) => {
            !email || !password
              ? event.preventDefault()
              : event.preventDefault();

            fetch("http://localhost:3000/api/v1/user/signup", {
              method: "POST",
              body: JSON.stringify({
                firstName,
                lastName,
                username: email,
                password,
              }),
              headers: { "Content-Type": "application/json" },
            })
              .then(async function (res) {
                const json = await res.json();
                console.log(json);
                json.success ? (
                  <Dashboard />
                ) : (
                  console.error("Error:", json.message)
                );
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }}
          to={`/dashboard`}
        > */}
        <button
          className="signup-btn"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            submitHandler({
              firstName,
              lastName,
              username: email,
              password,
            });
          }}
        >
          SIGN UP
        </button>
        {/* </Link> */}
        <p>
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/signin");
            }}
          >
            Login
          </span>
        </p>
      </form>
    </Card>
  );
}

export default Signup;
