import React from "react";
import { Card, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { formatRatingScore } from "utils";
import { restaurantItemData } from "constants/mock";

const RestaurantAnalyticsItem = (props) => {
  const navigate = useNavigate();
  const { restaurantId, restaurantName, avgRating } = restaurantItemData;

  return (
    <Card
      hoverable
      style={{ width: 260, height: 380, border: "1.5px solid #f3f3f3" }}
      size="small"
      cover={<img src="/images/restaurant.png" alt="restaurant" />}
      onClick={() =>
        navigate(`/restaurant/${restaurantId}`, {
          state: { from: window.location.pathname },
        })
      }
    >
      <div className="restanalyt-header">{restaurantName}</div>
      <div className="restanalyt-rating">
        <Rate
          disabled
          allowHalf
          defaultValue={5}
          value={avgRating}
          style={{ color: "#FF643D" }}
        />
        <div className="restanalyt-score">{formatRatingScore(avgRating)}</div>
      </div>
    </Card>
  );
};

export default RestaurantAnalyticsItem;
