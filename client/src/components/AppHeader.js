import React from "react";
import { Col, Row, Layout, Divider } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header>
      <Row align="bottom">
        <Col xs={22} sm={20} md={18} lg={16} xl={14}>
          <LeftMenu />
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <RightMenu />
        </Col>
      </Row>

      {window.location.pathname === "/" ? null : (
        <Divider className="header-divider" />
      )}
    </Header>
  );
};

export default AppHeader;
