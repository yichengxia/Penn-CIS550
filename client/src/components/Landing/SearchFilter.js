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

const SearchFilter = ({ searchParams, setSearchParams }) => {
  const onCityChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, city: value });
    }
  };

  const onCategoryChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, category: value });
    }
  };

  const onRatingChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, ratingLow: value });
    }
  };

  const onOpenChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, open: value });
    }
  };

  const onSortChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, sort: value });
    }
  };

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <div className="sf-item">
        <div className="sf-text">Location</div>
        <Select
          className="sf-select"
          bordered={false}
          defaultValue={
            searchParams ? searchParams.city : restaurantCityOptions[0].value
          }
          options={sortFilterOptions(restaurantCityOptions)}
          onChange={onCityChange}
        />
      </div>

      <div className="sf-item">
        <div className="sf-text">Category</div>
        <Select
          className="sf-select"
          bordered={false}
          defaultValue={
            searchParams
              ? searchParams.category
              : restaurantCategoryOptions[0].value
          }
          options={sortFilterOptions(restaurantCategoryOptions)}
          onChange={onCategoryChange}
        />
      </div>

      <div className="sf-item">
        <div className="sf-text">Rating</div>
        <Select
          className="sf-select"
          bordered={false}
          defaultValue={
            searchParams
              ? searchParams.ratingLow
              : restaurantRatingOptions[0].value
          }
          options={restaurantRatingOptions}
          onChange={onRatingChange}
        />
      </div>

      <div className="sf-item">
        <div className="sf-text">Open</div>
        <Select
          className="sf-select"
          bordered={false}
          defaultValue={
            searchParams ? searchParams.open : restaurantOpenOptions[0].value
          }
          options={restaurantOpenOptions}
          onChange={onOpenChange}
        />
      </div>

      <div className="sf-item">
        <div className="sf-text">Sort</div>
        <Select
          className="sf-select"
          bordered={false}
          defaultValue={
            searchParams ? searchParams.sort : restaurantSortOptions[0].value
          }
          options={restaurantSortOptions}
          onChange={onSortChange}
        />
      </div>
    </Space>
  );
};

export default SearchFilter;
