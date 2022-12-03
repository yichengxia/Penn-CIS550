import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Rate, Tag } from "antd";
import SavedItemHeader from "components/User/SavedItemHeader";
import { splitString, formatRatingScore, formatOpen } from "utils";

const RestaurantItem = ({ restaurantItemData, savedIcon, userId }) => {
  const navigate = useNavigate();

  const {
    restaurantId,
    restaurantName,
    reviewCount,
    address,
    categories,
    avgRating,
    open,
    imageUrl,
  } = restaurantItemData;

  const categoryItems = splitString(categories).map((category) => {
    return (
      <Tag color="default" key={category}>
        {category}
      </Tag>
    );
  });

  return (
    <Row
      className="restitem-container"
      gutter={32}
      wrap={false}
      onClick={() =>
        navigate(`/restaurant/${restaurantId}`, {
          state: { from: window.location.pathname },
        })
      }
    >
      <Col>
        <img src={imageUrl} className="restitem-image" alt="restaurant" />
      </Col>

      <Col>
        <div className="restitem-details">
          {savedIcon ? (
            <SavedItemHeader
              restaurantItemData={restaurantItemData}
              userId={userId}
            />
          ) : (
            <div className="restitem-name">{restaurantName}</div>
          )}

          <div className="restitem-rating">
            <Rate
              disabled
              allowHalf
              defaultValue={5}
              value={avgRating}
              style={{ color: "#FF643D" }}
            />
            <div className="restitem-score">{formatRatingScore(avgRating)}</div>
            <div className="restitem-review">
              &#40;{reviewCount} {reviewCount === 1 ? "review" : "reviews"}&#41;
            </div>
          </div>

          <div className="restitem-category">{categoryItems}</div>
          <div className="restitem-address">{address}</div>
          <div className={open === "Y" ? "restitem-open" : "restitem-closed"}>
            {formatOpen(open)}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default RestaurantItem;
