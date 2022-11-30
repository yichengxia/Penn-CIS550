import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout, Row, Col, Affix, List, message } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import RestaurantItem from "./RestaurantItem";
import EmptyItem from "components/Common/EmptyItem";
import GoogleMap from "./GoogleMap";
import { useFetchRestaurants } from "hooks";
import { paramsToObject, paginateResults } from "utils";

const { Content, Footer } = Layout;

const RestaurantListPage = () => {
  const navigate = useNavigate();
  const [fetchRestaurants] = useFetchRestaurants();

  const [restaurantListData, setRestaurantListData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  let [currentSearchParams, setCurrentSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchPageData = async () => {
      window.scrollTo(0, 0);

      const restaurantResults = await fetchRestaurants(
        paramsToObject(currentSearchParams.entries())
      );
      if (restaurantResults) {
        setTotalItems(restaurantResults.length);
        setRestaurantListData(restaurantResults);
      } else {
        message.error("Search failed!");
        navigate("/", { state: { from: window.location.pathname } });
      }
    };
    fetchPageData();
  }, []);

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        <Row align="space-between" wrap={false}>
          <Col className="restlist-items">
            {totalItems === 0 ? (
              <EmptyItem description="No restaurants found" />
            ) : (
              <List
                className="restlist-item"
                itemLayout="vertical"
                size="large"
                pagination={{
                  total: totalItems,
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
