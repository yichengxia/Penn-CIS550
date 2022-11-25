import React from "react";
import { Row, Col, Avatar } from "antd";
import { getInitial } from "utils";

const UserDetail = (props) => {
  const username = "Yifan Wu";
  const savedCount = 2;

  return (
    <div className="det-container">
      <Row className="det-row">
        <Col>
          <Avatar className="det-avatar" size={72}>
            {getInitial(username)}
          </Avatar>
        </Col>

        <Col>
          <div className="det-name">Yifan Wu</div>

          <div className="det-stats">
            <img className="userdet-icon" src="/icons/saved.png" alt="saved" />
            <div className="userdet-text">
              <div className="userdet-count">{savedCount}</div>
              {savedCount === 1 ? "Place" : "Places"}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserDetail;
