import React from "react";
import { Col, Row } from "antd";

const AppFooter = () => {
  return (
    <Row justify="space-evenly">
      <Col className="footer-col" span={8}>
        <a
          href="https://github.com/ruichen199801/cis550-fa22-project/wiki/Forx-News-Wiki"
          target="_blank"
          rel="noopener noreferrer"
        >
          About us
        </a>
      </Col>

      <Col className="footer-col" span={8}>
        <a
          href="https://github.com/ruichen199801/cis550-fa22-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </Col>

      <Col className="footer-col" span={8}>
        &#169; 2022 Forx News
      </Col>
    </Row>
  );
};

export default AppFooter;
