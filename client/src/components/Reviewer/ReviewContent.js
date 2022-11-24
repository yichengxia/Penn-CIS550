import React from "react";
import { Row } from "antd";

const ReviewContent = ({ content }) => {
  return (
    <Row className="rev-content">
      <div>{content}</div>
    </Row>
  );
};

export default ReviewContent;
