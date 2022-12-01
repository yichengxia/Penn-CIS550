import React from "react";
import { Spin } from "antd";

const LoadingItem = () => {
  return (
    <Spin tip="Loading" style={{ marginTop: "100px", marginLeft: "40%" }} />
  );
};

export default LoadingItem;
