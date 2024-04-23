import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login.js";
import Tasks from "./Tasks/Tasks.js";
import Register from "./Register/Register.js";
import { useState } from "react";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            exact
            path="/tasks"
            element={<Tasks setLoggedIn={setLoggedIn} />}
          />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
