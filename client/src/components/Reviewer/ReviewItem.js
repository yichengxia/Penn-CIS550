import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Tooltip } from "antd";
import ReviewRate from "./ReviewRate";
import ReviewContent from "./ReviewContent";
import ReviewVote from "./ReviewVote";

const ReviewItem = ({
  restaurantName,
  restaurantId,
  rating,
  funnyCount,
  usefulCount,
  coolCount,
  content,
  date,
  imageUrl,
}) => {
  const navigate = useNavigate();

  return (
    <div className="revitem-container">
      <Row wrap={false}>
        <Col>
          <Tooltip placement="bottom" title="View Restaurant">
            <img
              src={imageUrl}
              className="revitem-image"
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
