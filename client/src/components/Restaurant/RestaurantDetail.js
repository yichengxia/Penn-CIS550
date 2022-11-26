import React, { useState } from "react";
import { Row, Col, Tooltip, Space, message } from "antd";
import { StarFilled } from "@ant-design/icons";
import { splitString, formatRatingScore, formatOpen } from "utils";

const RestaurantDetail = ({
  restaurantName,
  reviewCount,
  address,
  categories,
  avgRating,
  open,
}) => {
  // TODO: call hook in useEffect to get saved or not, and populate the saved state.
  const [restaurantSaved, setRestaurantSaved] = useState(false);
  const [addressTextCopied, setAddressTextCopied] = useState(false);

  const onBookmarkClick = () => {
    setRestaurantSaved(!restaurantSaved);
    // prompt to login (finish localStorage refactor first!)
    if (restaurantSaved) {
      // call save restaurants hook
      message.success("You have successfully unsaved this restaurant.");
    } else {
      // call unsave restaurants hook
      message.success(
        "You have successfully saved this restaurant to your profile."
      );
    }
  };

  const categoryItems = splitString(categories).map((category) => {
    return <span key={category}>{category}</span>;
  });

  return (
    <div className="det-container">
      <Row className="det-row" wrap={false}>
        <Col>
          <img
            className="restdet-image"
            src="/images/restaurant.png"
            alt="restaurant"
          />
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

            <div className="restdet-category">
              <Space direction="horizontal" size="middle">
                {categoryItems}
              </Space>
            </div>

            <Tooltip
              placement="bottom"
              title={
                addressTextCopied ? "Text copied!" : "Copy text to clipboard"
              }
            >
              <div
                className="restdet-address"
                onClick={() => {
                  setAddressTextCopied(true);
                  navigator.clipboard.writeText(address);
                }}
              >
                {address}
              </div>
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
