import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout, Row, Col, Affix, List, Empty } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import RestaurantItem from "./RestaurantItem";
import GoogleMap from "./GoogleMap";
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
          <Col className="restlist-items">
            {totalPages === 0 ? (
              <Empty
                className="restlist-empty"
                description="No restaurants found"
              />
            ) : (
              <List
                className="restlist-item"
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

          <Col className="restlist-map">
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
