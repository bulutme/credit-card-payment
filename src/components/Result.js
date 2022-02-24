import React from "react";
import SuccessImage from "./../images/success.png";
import FailImage from "./../images/fail.png";

const Result = ({ isSuccess }) => {
  return (
    <div className="resultDiv">
      <img src={isSuccess ? SuccessImage : FailImage} alt="" />
      <span>{isSuccess ? "Payment Successful!" : "Payment Failed!"}</span>
    </div>
  );
};
export default Result;
