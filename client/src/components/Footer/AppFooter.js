import React from "react";
import { Col, Row } from "antd";

const AppFooter = () => {
  return (
    <Row justify="space-evenly">
      <Col className="footer-col" span={8}>
        <a
          href="https://app.gitbook.com/o/3NX3D2iFUb3JICUWd4ed/s/I4x9HIDkz03Vj7DLZHfa"
          target="_blank"
          rel="noopener noreferrer"
        >
          About us
        </a>
      </Col>

      <Col className="footer-col" span={8}>
        <a
          // href="https://github.com/ruichen199801/cis550-fa22-project"
          href="https://github.com/ruichen199801"
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
