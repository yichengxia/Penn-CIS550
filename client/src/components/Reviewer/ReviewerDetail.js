import React from "react";
import { Row, Col, Avatar } from "antd";
import { StarFilled } from "@ant-design/icons";
import { getInitial } from "utils";

const ReviewerDetail = ({
  name,
  avgRating,
  funnyCount,
  usefulCount,
  coolCount,
  reviewCount,
}) => {
  return (
    <div className="det-container">
      <Row className="det-row">
        <Col>
          <Avatar className="det-avatar" size={72}>
            {getInitial(name)}
          </Avatar>
        </Col>

        <Col>
          <div className="det-name">{name}</div>

          <div className="det-stats">
            <StarFilled style={{ color: "#FF643D", fontSize: "26px" }} />
            <div className="reviewerdet-score">{avgRating}</div>
            <div className="reviewerdet-count">
              {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
            </div>

            <div className="reviewerdet-vote-container">
              <div className="rev-vote-container">
                &#40;
                <div className="reviewerdet-useful">
                  Useful <span className="rev-vote-count">{usefulCount}</span>
                </div>
                <div className="reviewerdet-funny">
                  Funny <span className="rev-vote-count">{funnyCount}</span>
                </div>
                <div className="reviewerdet-cool">
                  Cool <span className="rev-vote-count">{coolCount}</span>
                </div>
                &#41;
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewerDetail;
