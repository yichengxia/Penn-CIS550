import React from "react";
import { Rate } from "antd";

const ReviewRate = ({ rating, date }) => {
  return (
    <div className="rev-rate-container">
      <Rate disabled defaultValue={rating} style={{ color: "#FF643D" }} />
      <div className="rev-date">{date}</div>
    </div>
  );
};

export default ReviewRate;
