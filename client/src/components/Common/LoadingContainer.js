import React from "react";
import { Spin } from "antd";

const LoadingContainer = ({ type }) => {
  const containerStyles = {
    restaurant: (
      <div className="det-container" style={{ height: "265px" }}>
        <Spin style={{ marginLeft: "40%", marginTop: "80px" }} />
      </div>
    ),
    reviewer: (
      <div className="det-container" style={{ height: "115px" }}>
        <Spin style={{ marginLeft: "40%", marginTop: "25px" }} />
      </div>
    ),
    user: (
      <div className="det-container" style={{ height: "115px" }}>
        <Spin style={{ marginLeft: "40%", marginTop: "25px" }} />
      </div>
    ),
  };

  return containerStyles[type];
};

export default LoadingContainer;
