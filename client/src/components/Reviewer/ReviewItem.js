import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Tooltip } from "antd";
import ReviewRate from "./ReviewRate";
import ReviewContent from "./ReviewContent";
import ReviewVote from "./ReviewVote";

const ReviewItem = ({
  rating,
  funnyCount,
  usefulCount,
  coolCount,
  content,
  date,
}) => {
  const navigate = useNavigate();

  const restaurantName = "Black Chile Mexican Grill";
  const restaurantId = "_-9pMxBWtG_x8l4rHWBasg";

  return (
    <div className="revitem-container">
      <Row>
        <Col>
          <Tooltip placement="bottom" title="View Restaurant">
            <img
              className="revitem-image"
              src="/images/restaurant.png"
              alt="restaurant"
              onClick={() =>
                navigate(`/restaurant/${restaurantId}`, {
                  state: { from: window.location.pathname },
                })
              }
            />
          </Tooltip>
        </Col>

        <Col>
          <div className="revitem-name">{restaurantName}</div>

          <ReviewRate rating={rating} date={date} />

          <div className="revitem-vote">
            <ReviewVote
              usefulCount={usefulCount}
              funnyCount={funnyCount}
              coolCount={coolCount}
            />
          </div>
        </Col>
      </Row>

      <ReviewContent content={content} />
    </div>
  );
};

export default ReviewItem;
