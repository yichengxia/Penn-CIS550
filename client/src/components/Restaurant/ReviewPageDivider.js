import React from "react";
import { useNavigate, useParams, createSearchParams } from "react-router-dom";
import { Row, Col, Select } from "antd";
import { reviewRatingOptions, reviewSortOptions } from "constants/constants";

const ReviewPageDivider = ({ searchParams, setSearchParams }) => {
  const navigate = useNavigate();

  const routeParams = useParams();
  const restaurantId = routeParams.restaurantId ? routeParams.restaurantId : "";

  const onRatingChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, rating: value });

      navigate(
        {
          pathname: `/restaurant/${restaurantId}`,
          search: `?${createSearchParams({ ...searchParams, rating: value })}`,
        },
        { state: { from: window.location.pathname } }
      );
      window.location.reload();
    }
  };

  const onSortChange = (value) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, sort: value });

      navigate(
        {
          pathname: `/restaurant/${restaurantId}`,
          search: `?${createSearchParams({ ...searchParams, sort: value })}`,
        },
        { state: { from: window.location.pathname } }
      );
      window.location.reload();
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
