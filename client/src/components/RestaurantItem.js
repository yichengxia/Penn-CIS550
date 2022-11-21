import React from "react";
import { Row, Col, Rate, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { splitString, formatRatingScore, formatOpen } from "utils";

const RestaurantItem = ({
  restaurantId,
  restaurantName,
  reviewCount,
  address,
  categories,
  avgRating,
  open,
}) => {
  const navigate = useNavigate();

  const categoryItems = splitString(categories).map((category) => {
    return (
      <Tag color="default" key={category}>
        {category}
      </Tag>
    );
  });

  return (
    <Row
      className="ri-container"
      justify="start"
      gutter={32}
      wrap={false}
      onClick={() =>
        navigate(`/restaurant/${restaurantId}`, {
          state: { from: window.location.pathname },
        })
      }
    >
      <Col>
        <img
          className="ri-image"
          src="/images/restaurant.png"
          alt="restaurant"
        />
      </Col>
      <Col>
        <div className="ri-details">
          <div className="ri-header">{restaurantName}</div>
          <div className="ri-rating">
            <Rate
              disabled
              defaultValue={avgRating}
              style={{ color: "#FF643D" }}
            />
            <div className="ri-score">{formatRatingScore(avgRating)}</div>
            <div className="ri-review">&#40;{reviewCount} reviews&#41;</div>
          </div>
          <div className="ri-category">{categoryItems}</div>
          <div className="ri-address">{address}</div>
          <div className={open === "Y" ? "ri-open" : "ri-closed"}>
            {formatOpen(open)}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default RestaurantItem;
