import React from "react";
import { Spin } from "antd";

const LoadingContainer = ({ type }) => {
  const containerStyles = {
    restaurant: (
      <div className="det-container" style={{ height: "265px" }}>
        <Spin style={{ marginTop: "80px", marginLeft: "40%" }} />
      </div>
    ),
    reviewer: (
      <div className="det-container" style={{ height: "115px" }}>
        <Spin style={{ marginTop: "25px", marginLeft: "40%" }} />
      </div>
    ),
    user: (
      <div className="det-container" style={{ height: "115px" }}>
        <Spin style={{ marginTop: "25px", marginLeft: "40%" }} />
      </div>
    ),
  };

  return containerStyles[type];
};

export default LoadingContainer;
