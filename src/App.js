import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./containers/Routes";
import { authActions } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
