import React from "react";
import { Row } from "antd";
import { trimContent } from "utils";

const ReviewContent = ({ content }) => {
  return (
    <Row className="rev-content">
      <div>{trimContent(content)}</div>
    </Row>
  );
};

export default ReviewContent;
