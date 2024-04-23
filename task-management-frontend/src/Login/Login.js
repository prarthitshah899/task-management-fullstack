import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";

const Login = (props) => {
  const { setLoggedIn } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginApiError, setLoginApiError] = useState("");

  const navigate = useNavigate();

  const onLoginClicked = () => {
    setEmailError("");
    setPasswordError("");
    setLoginApiError("");

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
    setLoggedIn(true);

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/tasks");
      })
      .catch((error) => {
        setLoginApiError(error);
      });
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <Input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <Input.Password
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <Button type="primary" onClick={onLoginClicked} size="large">
          Log in
        </Button>
        <label className="errorLabel">{loginApiError}</label>
      </div>
    </div>
  );
};

export default Login;
