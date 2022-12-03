import React from "react";
import { Card, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { formatRatingScore } from "utils";

const RestaurantAnalyticsItem = ({
  restaurantId,
  restaurantName,
  avgRating,
  city,
  imageUrl,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{
        width: 260,
        border: "1.5px solid #f3f3f3",
        borderRadius: "5px",
      }}
      size="small"
      cover={
        <img src={imageUrl} className="restanalyt-image" alt="restaurant" />
      }
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
      <div className="restanalyt-city">{city}</div>
    </Card>
  );
};

export default RestaurantAnalyticsItem;
