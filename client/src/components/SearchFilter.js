import React from "react";
import { Select, Space } from "antd";
import {
  restaurantCityOptions,
  restaurantCategoryOptions,
  restaurantRatingOptions,
  restaurantOpenOptions,
  restaurantSortOptions,
} from "constants/constants";
import { sortFilterOptions } from "utils";

const SearchFilter = ({ setSearchParams }) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Space
      className="sf-container"
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <div>
        <div className="sf-text">Location</div>
        <Select
          className="sf-select"
          bordered={false}
          defaultValue={restaurantCityOptions[0].value}
          options={sortFilterOptions(restaurantCityOptions)}
          onChange={onChange}
        />
      </div>
      <div>
        <div className="sf-text">Category</div>
        <Select
          className="sf-select"
          bordered={false}
          defaultValue={restaurantCategoryOptions[0].value}
          options={sortFilterOptions(restaurantCategoryOptions)}
          onChange={onChange}
        />
      </div>
      <div>
        <div className="sf-text">Rating</div>
        <Select
          className="sf-select"
          bordered={false}
          defaultValue={restaurantRatingOptions[0].value}
          options={restaurantRatingOptions}
          onChange={onChange}
        />
      </div>
      <div>
        <div className="sf-text">Open</div>
        <Select
          className="sf-select"
          bordered={false}
          defaultValue={restaurantOpenOptions[0].value}
          options={restaurantOpenOptions}
          onChange={onChange}
        />
      </div>
      <div>
        <div className="sf-text">Sort</div>
        <Select
          className="sf-select"
          bordered={false}
          defaultValue={restaurantSortOptions[0].value}
          options={restaurantSortOptions}
          onChange={onChange}
        />
      </div>
    </Space>
  );
};

export default SearchFilter;
