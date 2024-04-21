import React from "react";
import { useNavigate } from "react-router-dom";

const Tasks = (props) => {
  const { loggedIn } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the tasks page.</div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? "Log out" : "Log in"}
        />
      </div>
    </div>
  );
};

export default Tasks;
