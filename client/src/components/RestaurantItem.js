import React from "react";
import { Layout, Row, Col } from "antd";

const RestaurantItem = ({ restaurants }) => {
  return (
    <Row className="content">
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        xl={{ span: 10, gutter: 2 }}
        xxl={{ span: 10, gutter: 2 }}
      >
        <img
          className="ri-image"
          src="images/restaurant.png"
          alt="restaurant"
        />
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        xl={{ offset: 2, span: 10 }}
        xxl={{ offset: 2, span: 10 }}
      >
        hihi
        {/* <TextualInfo listingInfo={listingDetail} /> */}
      </Col>
    </Row>
  );
};

export default RestaurantItem;
