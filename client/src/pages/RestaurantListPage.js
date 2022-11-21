import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout, Affix, List, Empty } from "antd";
import AppHeader from "components/AppHeader";
import RestaurantItem from "components/RestaurantItem";
import AppFooter from "components/AppFooter";
import { restaurantListData } from "constants/mock";

const { Content, Footer } = Layout;

const RestaurantListPage = () => {
  const [totalPage, setTotalPage] = useState(100); // change to 0
  const [pageSize, setPageSize] = useState(10);

  let [currentSearchParams, setCurrentSearchParams] = useSearchParams();
  // TODO: call search hook using currentSearchParams in useEffect().
  // convert string to number for ratingLow and ratingHigh
  // set total page and page size

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        {totalPage === 0 ? (
          <Empty className="rl-empty" description="No restaurants found" />
        ) : (
          <List
            className="rl-item"
            itemLayout="vertical"
            size="large"
            pagination={{
              total: totalPage,
              pageSize,
              hideOnSinglePage: true,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total}`,
            }}
            dataSource={restaurantListData}
            renderItem={(restaurantItem) => (
              <RestaurantItem {...restaurantItem} />
            )}
          />
        )}
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default RestaurantListPage;
