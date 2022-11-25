import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Avatar, Tooltip } from "antd";
import ReviewRate from "components/Reviewer/ReviewRate";
import ReviewContent from "components/Reviewer/ReviewContent";
import ReviewVote from "components/Reviewer/ReviewVote";
import { getInitial } from "utils";
import { reviewItemData } from "constants/mock";

const RestaurantReviewItem = (props) => {
  const navigate = useNavigate();

  const {
    reviewerId,
    rating,
    funnyCount,
    usefulCount,
    coolCount,
    content,
    date,
  } = reviewItemData;

  const name = "Scott";
  const reviewCount = 91;

  return (
    <div className="restrevitem-container">
      <Row>
        <Col>
          <Tooltip placement="bottom" title="Reviewer Profile">
            <Avatar
              className="restrevitem-avatar"
              size={50}
              onClick={() =>
                navigate(`/reviewer/${reviewerId}`, {
                  state: { from: window.location.pathname },
                })
              }
            >
              {getInitial(name)}
            </Avatar>
          </Tooltip>
        </Col>

        <Col>
          <div className="restrevitem-name-container">
            <div className="restrevitem-name">{name}</div>
            <div className="restrevitem-count">
              &#40;{reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}&#41;
            </div>
          </div>

          <ReviewRate rating={rating} date={date} />
        </Col>
      </Row>

      <ReviewContent content={content} />

      <Row>
        <ReviewVote
          usefulCount={usefulCount}
          funnyCount={funnyCount}
          coolCount={coolCount}
        />
      </Row>
    </div>
  );
};

export default RestaurantReviewItem;
