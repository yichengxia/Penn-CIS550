import React from "react";
import { Spin } from "antd";

const LoadingItem = () => {
  return <Spin className="loading" tip="Loading" />;
};

export default LoadingItem;
