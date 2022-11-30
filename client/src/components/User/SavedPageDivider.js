import React from "react";
import { Row, Col, Select } from "antd";
import { savedRestaurantSortOptions } from "constants/constants";

const SavedPageDivider = ({ searchParams, setSearchParams }) => {
  const onSortChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, sort: value });
    }
  };

  return (
    <Row className="divid-container">
      <Col>
        <div className="divid-header">My Bookmarks</div>
      </Col>

      <Col>
        <div className="savedivid-sort">
          <div className="divid-text">Sort:</div>
          <Select
            className="divid-select"
            bordered={false}
            defaultValue={
              searchParams
                ? searchParams.sort
                : savedRestaurantSortOptions[0].value
            }
            options={savedRestaurantSortOptions}
            onChange={onSortChange}
          />
        </div>
      </Col>
    </Row>
  );
};

export default SavedPageDivider;
