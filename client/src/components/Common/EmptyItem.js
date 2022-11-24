import React from "react";
import { Empty } from "antd";

const EmptyItem = ({ description }) => {
  return <Empty className="empty" description={description} />;
};

export default EmptyItem;
