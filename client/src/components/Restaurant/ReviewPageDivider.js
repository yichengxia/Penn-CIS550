import React from "react";
import { Row, Col, Select } from "antd";
import { reviewRatingOptions, reviewSortOptions } from "constants/constants";

const ReviewPageDivider = ({ searchParams, setSearchParams }) => {
  const onRatingChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, rating: value });
    }
  };

  const onSortChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, sort: value });
    }
  };

  return (
    <Row className="divid-container">
      <Col>
        <div className="divid-header">Reviews</div>
      </Col>

      <Col>
        <div className="revdivid-filter">
          <div className="divid-text">Filter:</div>
          <Select
            className="divid-select"
            bordered={false}
            defaultValue={
              searchParams ? searchParams.rating : reviewRatingOptions[0].value
            }
            options={reviewRatingOptions}
            onChange={onRatingChange}
          />
        </div>
      </Col>

      <Col>
        <div className="revdivid-sort">
          <div className="divid-text">Sort:</div>
          <Select
            className="divid-select"
            bordered={false}
            defaultValue={
              searchParams ? searchParams.sort : reviewSortOptions[0].value
            }
            options={reviewSortOptions}
            onChange={onSortChange}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ReviewPageDivider;
