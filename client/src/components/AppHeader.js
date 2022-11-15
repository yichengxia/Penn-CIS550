import React from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Col, Row } from "antd";

const AppHeader = () => {
  return (
    <Row align="bottom">
      <Col xs={22} sm={20} md={18} lg={16} xl={14}>
        <LeftMenu />
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={10}>
        <RightMenu />
      </Col>
    </Row>
  );
};

export default AppHeader;
