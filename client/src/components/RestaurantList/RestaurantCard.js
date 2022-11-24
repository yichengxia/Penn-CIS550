import React from "react";
import { Card, Rate } from "antd";
import { formatRatingScore } from "utils";

const RestaurantCard = ({ restaurantId, restaurantName, avgRating }) => {
  return (
    <a href={`/restaurant/${restaurantId}`}>
      <Card
        size="small"
        style={{ width: 220 }}
        bordered={false}
        cover={<img src="/images/restaurant.png" alt="restaurant" />}
      >
        <div className="restcard-header">{restaurantName}</div>
        <div className="restcard-rating">
          <Rate
            disabled
            defaultValue={avgRating}
            style={{ color: "#FF643D" }}
          />
          <div className="restcard-score">{formatRatingScore(avgRating)}</div>
        </div>
      </Card>
    </a>
  );
};

export default RestaurantCard;
