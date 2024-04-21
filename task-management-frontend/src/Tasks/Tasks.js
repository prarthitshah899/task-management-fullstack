import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tasks = (props) => {
  const { loggedIn } = props;
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const fetchInfo = async () => {
    const response = await fetch("http://127.0.0.1:5000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const tasksData = await response.json();
    if (tasksData["message"]) {
      return setTasks(tasksData["data"]);
    } else {
      return [];
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

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
