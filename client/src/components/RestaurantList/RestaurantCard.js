import React from "react";
import { Card, Rate } from "antd";
import { formatRatingScore } from "utils";

const RestaurantCard = ({
  restaurantId,
  restaurantName,
  avgRating,
  city,
  imageUrl,
}) => {
  return (
    <a href={`/restaurant/${restaurantId}`}>
      <Card
        size="small"
        style={{ width: 220 }}
        bordered={false}
        cover={
          <img src={imageUrl} className="restcard-image" alt="restaurant" />
        }
      >
        <div className="restcard-header">{restaurantName}</div>
        <div className="restcard-rating">
          <Rate
            disabled
            allowHalf
            defaultValue={5}
            value={avgRating}
            style={{ color: "#FF643D" }}
          />
          <div className="restcard-score">{formatRatingScore(avgRating)}</div>
        </div>
        <div className="restcard-city">{city}</div>
      </Card>
    </a>
  );
};

export default RestaurantCard;
