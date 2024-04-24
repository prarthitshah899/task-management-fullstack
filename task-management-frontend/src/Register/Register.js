import "./Register.css";
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, notification } from "antd";

const Context = React.createContext({
  name: "Default",
});

const Register = () => {
  const [api, contextHolder] = notification.useNotification();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signupApiError, setSignupApiError] = useState("");

  const navigate = useNavigate();

  const openNotification = (placement, message) => {
    api.info({
      message: message,
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const onSignupClicked = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      return setEmailError("Please enter your email");
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return setEmailError("Please enter a valid email");
    }

    if ("" === password || "" === confirmPassword) {
      return setPasswordError("Please enter a password");
    }
    if (password !== confirmPassword) {
      return setConfirmPasswordError("Please Enter Similar password");
    }

    if (password.length < 7 || confirmPassword.length < 7) {
      return setPasswordError("The password must be 8 characters or longer");
    }

    fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.statusCode !== 200) {
          setSignupApiError(data?.message);
        } else {
          openNotification("topRight", data?.message);
          navigate("/");
        }
      })
      .catch((error) => {
        setSignupApiError(error);
      });
  };

  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <div className={"mainContainer"}>
          <div className={"titleContainer"}>
            <div>Register</div>
          </div>
          <br />
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
            <Input.Password
              value={confirmPassword}
              placeholder="Re-Enter your password here"
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{confirmPasswordError}</label>
          </div>
          <br></br>
          <div className={"inputContainer"}>
            <Button type="primary" onClick={onSignupClicked} size="large">
              Sign up
            </Button>
          </div>
          <br></br>
          <label className="errorLabel">{signupApiError}</label>
          <br></br>
          <div className={"inputContainer"}>
            <Button type="primary" onClick={() => navigate("/")} ghost>
              Already Logged in ?
            </Button>
          </div>
        </div>
      </Context.Provider>
    </>
  );
};

export default Register;
