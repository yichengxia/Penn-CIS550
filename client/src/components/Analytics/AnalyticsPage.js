import React from "react";
import { Layout, Affix } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";

const { Content, Footer } = Layout;

const AnalyticsPage = () => {
  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content></Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default AnalyticsPage;
