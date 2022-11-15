import React from "react";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, Input, Affix } from "antd";
import AppHeader from "components/AppHeader";
import AppFooter from "components/AppFooter";

const { Content, Footer } = Layout;

const Landing = () => {
  return (
    <>
      <Layout className="landing-layout">
        <Affix offsetTop={0}>
          <AppHeader />
        </Affix>

        <Content className="landing-content">
          {/* <Input
            addonBefore={<SearchOutlined />}
            addonAfter={<MenuOutlined />}
            placeholder="Search Restaurants"
          /> */}
        </Content>

        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </>
  );
};

export default Landing;
