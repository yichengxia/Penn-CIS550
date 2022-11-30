import React, { useState } from "react";
import { Tooltip, message } from "antd";
import { useSaveRestaurant, useUnsaveRestaurant } from "hooks";

const SavedItemHeader = ({ restaurantItemData, userId }) => {
  const [saveRestaurant] = useSaveRestaurant();
  const [unsaveRestaurant] = useUnsaveRestaurant();
  const [restaurantSaved, setRestaurantSaved] = useState(true);

  const { restaurantId, restaurantName } = restaurantItemData;

  const onBookmarkClick = async (e) => {
    e.stopPropagation();

    if (!restaurantSaved) {
      const saveResponseStatus = await saveRestaurant(
        userId,
        restaurantId,
        new Date().toLocaleDateString()
      );
      if (saveResponseStatus === 201) {
        message.success("Restaurant saved!");
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
  };

  return (
    <div className="saveditem-header">
      <div className="saveditem-name">{restaurantName}</div>
      <Tooltip
        placement="bottom"
        title={restaurantSaved ? "Unsave restaurant" : "Save restaurant"}
      >
        <img
          className="saveditem-icon"
          src={
            restaurantSaved ? "/icons/bookmark-fill.svg" : "/icons/bookmark.svg"
          }
          alt="bookmark"
          onClick={(e) => onBookmarkClick(e)}
        />
      </Tooltip>
    </div>
  );
};

export default SavedItemHeader;
