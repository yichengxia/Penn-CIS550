import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout, Row, Col, Affix, List, Empty } from "antd";
import AppHeader from "components/AppHeader";
import RestaurantItem from "components/RestaurantItem";
import GoogleMap from "components/GoogleMap";
import AppFooter from "components/AppFooter";
import { paginateResults } from "utils";
import { restaurantListData } from "constants/mock";

const { Content, Footer } = Layout;

const RestaurantListPage = () => {
  const [totalPages, setTotalPages] = useState(100); // total number of restaurants, change to 0
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  let [currentSearchParams, setCurrentSearchParams] = useSearchParams();
  // TODO: call search hook using currentSearchParams in useEffect().
  // convert string to number for ratingLow and ratingHigh
  // set total page and page size
  // handle null and empty case here

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        <Row align="space-between" wrap={false}>
          <Col className="rl-items">
            {totalPages === 0 ? (
              <Empty className="rl-empty" description="No restaurants found" />
            ) : (
              <List
                className="rl-item"
                itemLayout="vertical"
                size="large"
                pagination={{
                  total: totalPages,
                  pageSize,
                  hideOnSinglePage: true,
                  showSizeChanger: false,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total}`,
                  onChange: (page) => {
                    setCurrentPage(page);
                    window.scrollTo(0, 0);
                  },
                }}
                dataSource={restaurantListData}
                renderItem={(restaurantItem) => (
                  <RestaurantItem {...restaurantItem} />
                )}
              />
            )}
          </Col>

          <Col className="rl-map">
            <GoogleMap
              restaurantItems={paginateResults(
                restaurantListData,
                currentPage,
                pageSize
              )}
            />
          </Col>
        </Row>
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default RestaurantListPage;
