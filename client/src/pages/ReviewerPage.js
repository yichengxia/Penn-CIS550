import React from "react";
import { Layout, Affix } from "antd";
import AppHeader from "components/AppHeader";
import AppFooter from "components/AppFooter";

const { Content, Footer } = Layout;

const ReviewerPage = () => {
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

export default ReviewerPage;
