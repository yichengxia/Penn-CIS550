import React from "react";
import { Empty } from "antd";

const EmptyItem = ({ description }) => {
  return (
    <Empty
      description={description}
      style={{ position: "absolute", marginTop: "40px", marginLeft: "20%" }}
    />
  );
};

export default EmptyItem;
