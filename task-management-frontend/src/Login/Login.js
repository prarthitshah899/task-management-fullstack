import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { setLoggedIn } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onLoginClicked = () => {
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      return setEmailError("Please enter your email");
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return setEmailError("Please enter a valid email");
    }

    if ("" === password) {
      return setPasswordError("Please enter a password");
    }

    if (password.length < 7) {
      return setPasswordError("The password must be 8 characters or longer");
    }
    console.log(email);
    console.log(password);
    setLoggedIn(true);
    navigate("/tasks");
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onLoginClicked}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
