import React from "react";
import { Col, Row, Button } from "antd";

const AppFooter = () => {
  return (
    <Row justify="space-between">
      <Col
        className="footer-col"
        xs={{ span: 5, offset: 1 }}
        lg={{ span: 6, offset: 2 }}
      >
        <Button
          type="text"
          href="https://github.com/ruichen199801/cis550-fa22-project/wiki/Forx-News-Wiki"
          target="_blank"
        >
          About us
        </Button>
      </Col>

      <Col
        className="footer-col"
        xs={{ span: 11, offset: 1 }}
        lg={{ span: 6, offset: 2 }}
      >
        <Button
          type="text"
          href="https://github.com/ruichen199801/cis550-fa22-project"
          target="_blank"
        >
          GitHub
        </Button>
      </Col>

      <Col
        className="footer-col"
        xs={{ span: 5, offset: 1 }}
        lg={{ span: 6, offset: 2 }}
      >
        &#169; 2022 Forx News
      </Col>
    </Row>
  );
};

export default AppFooter;
