import React from "react";
import { Layout, Affix } from "antd";
import AppHeader from "components/AppHeader";
import AppFooter from "components/AppFooter";

const { Content, Footer } = Layout;

const RestaurantList = () => {
  return (
    <>
      <Layout className="landing-layout">
        <Affix offsetTop={0}>
          <AppHeader />
        </Affix>

        <Content className="landing-content">
          This is RestaurantList page.
        </Content>

        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </>
  );
};

export default RestaurantList;
