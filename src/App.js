import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./containers/Routes";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/actions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngry } from "@fortawesome/free-solid-svg-icons/faAngry";
import { faLaugh } from "@fortawesome/free-solid-svg-icons/faLaugh";
import { faSadCry } from "@fortawesome/free-solid-svg-icons/faSadCry";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faSort } from "@fortawesome/free-solid-svg-icons/faSort";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons/faCheckSquare";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons/faTimesCircle";
import { faPauseCircle } from "@fortawesome/free-solid-svg-icons/faPauseCircle";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";

library.add(
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle
);

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  return (
    <>
      {isAuthenticated === undefined ? (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
          <ClipLoader color="#f86c6b" size={150} loading={true} />
        </div>
      ) : (
        <Router>
          <Routes />
        </Router>
      )}
    </>
  );
}

export default App;
