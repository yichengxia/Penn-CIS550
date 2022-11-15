import React from "react";
import { Col, Row, Button } from "antd";

const AppFooter = () => {
  return (
    <Row justify="space-evenly">
      <Col className="footer-text-col" span={8}>
        <Button
          type="text"
          href="https://github.com/ruichen199801/cis550-fa22-project/wiki/Forx-News-Wiki"
          target="_blank"
          className="footer-text"
        >
          About us
        </Button>
      </Col>

      <Col className="footer-text-col" span={8}>
        <Button
          type="text"
          href="https://github.com/ruichen199801/cis550-fa22-project"
          target="_blank"
          className="footer-text"
        >
          GitHub
        </Button>
      </Col>

      <Col className="footer-copyright" span={8}>
        &#169; 2022 Forx News
      </Col>
    </Row>
  );
};

export default AppFooter;
