import React from "react";
import { Layout, Affix, List } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import AnalyticsRestaurantItem from "./RestaurantAnalyticsItem";
import {
  restaurantAnalyticsData,
  reviewAnalyticsData,
  reviewerAnalyticsData,
} from "constants/mock";

const { Content, Footer } = Layout;

const AnalyticsPage = () => {
  const gridConfig = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    xxl: 6,
  };

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        <div className="analyt-items">
          <div className="analyt-item analyt-first">
            <div className="analyt-text">Best Restaurants</div>
            <List
              grid={gridConfig}
              dataSource={restaurantAnalyticsData}
              renderItem={(item) => (
                <List.Item>
                  <AnalyticsRestaurantItem {...item} />
                </List.Item>
              )}
            />
          </div>
        </div>
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default AnalyticsPage;
