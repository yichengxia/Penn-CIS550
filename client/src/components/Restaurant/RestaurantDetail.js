import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Tooltip, Space, message } from "antd";
import { StarFilled } from "@ant-design/icons";
import {
  useFetchCurrentUser,
  useFetchSavedRestaurant,
  useSaveRestaurant,
  useUnsaveRestaurant,
} from "hooks";
import { splitString, formatRatingScore, formatOpen } from "utils";

const RestaurantDetail = ({
  restaurantId,
  restaurantName,
  reviewCount,
  address,
  categories,
  avgRating,
  open,
  imageUrl,
}) => {
  const navigate = useNavigate();
  const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
  const [fetchSavedRestaurant] = useFetchSavedRestaurant();
  const [saveRestaurant] = useSaveRestaurant();
  const [unsaveRestaurant] = useUnsaveRestaurant();

  const [userId, setUserId] = useState(0);
  const [restaurantSaved, setRestaurantSaved] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        setUserId(user.userId);

        const savedRestaurant = await fetchSavedRestaurant({
          userId: user.userId,
          restaurantId: window.location.pathname.split("/")[2],
        });
        if (savedRestaurant && savedRestaurant.length === 1) {
          setRestaurantSaved(true);
        }
      }
    };
    fetchPageData();
  }, []);

  const onBookmarkClick = async () => {
    if (userId === 0) {
      message.error("You need to log in first!");
      navigate("/login", {
        state: { from: window.location.pathname },
      });
    } else {
      if (!restaurantSaved) {
        const saveResponseStatus = await saveRestaurant(
          userId,
          restaurantId,
          new Date().toLocaleDateString()
        );
        if (saveResponseStatus === 201) {
          message.success("Restaurant saved to profile!");
          setRestaurantSaved(true);
        } else {
          message.error("Save failed!");
        }
      } else {
        const unsaveResponseStatus = await unsaveRestaurant(restaurantId);
        if (unsaveResponseStatus === 200) {
          message.success("Restaurant unsaved!");
          setRestaurantSaved(false);
        } else {
          message.error("Unsave failed!");
        }
      }
    }
  };

  const categoryItems = splitString(categories).map((category) => {
    return (
      <span className="restdet-category" key={category}>
        {category}
      </span>
    );
  });

  return (
    <div className="det-container">
      <Row className="det-row" wrap={false}>
        <Col>
          <img src={imageUrl} className="restdet-image" alt="restaurant" />
        </Col>

        <Col className="restdet-details">
          <Space direction="vertical" size="middle">
            <div className="restdet-header">
              <div className="det-name">{restaurantName}</div>
              <Tooltip
                placement="bottom"
                title={
                  restaurantSaved ? "Unsave restaurant" : "Save restaurant"
                }
              >
                <img
                  className="restdet-icon"
                  src={
                    restaurantSaved
                      ? "/icons/bookmark-fill.svg"
                      : "/icons/bookmark.svg"
                  }
                  alt="bookmark"
                  onClick={onBookmarkClick}
                />
              </Tooltip>
            </div>

            <div className="det-stats">
              <StarFilled style={{ color: "#FF643D", fontSize: "26px" }} />
              <div className="restdet-score">
                {formatRatingScore(avgRating)}
              </div>
              <div>
                {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
              </div>
            </div>

            <div>{categoryItems}</div>

            <Tooltip placement="bottom" title={"Copy text to clipboard"}>
              <span
                className="restdet-address"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                }}
              >
                {address}
              </span>
            </Tooltip>

            <div className={open === "Y" ? "restitem-open" : "restitem-closed"}>
              {formatOpen(open)}
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default RestaurantDetail;
