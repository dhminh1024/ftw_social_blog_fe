import React from "react";
// import { useSelector } from "react-redux";
// import { Alert } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AlertMsg = () => {
  // const alerts = useSelector((state) => state.alert);
  return (
    // alerts !== null &&
    // alerts.length > 0 &&
    // alerts.map((alert) => (
    //   <Alert key={alert.id} variant={alert.alertType} className="text-center">
    //     {alert.msg}
    //   </Alert>
    // ))
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnHover
    />
  );
};

export default AlertMsg;
