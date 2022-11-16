import React, { useState } from "react";
import { Layout, Input, Affix } from "antd";
import AppHeader from "components/AppHeader";
import SearchFilter from "components/SearchFilter";
import AppFooter from "components/AppFooter";

const { Content, Footer } = Layout;

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const onPressEnter = () => {
    setSearchTerm("");
  };

  const [searchParams, setSearchParams] = useState({
    city: "",
    category: "",
    ratingLow: 0,
    ratingHigh: 5,
    open: "Y",
    sort: "avgRating",
  });

  return (
    <>
      <Layout className="landing-layout">
        <Affix offsetTop={0}>
          <AppHeader />
        </Affix>

        <Content className="landing-content">
          <img className="landing-logo" src="images/logo-full.svg" alt="logo" />
          <Input
            className="landing-input"
            size="large"
            prefix={
              <img
                className="landing-icon-search"
                src="icons/search.svg"
                alt="search"
              />
            }
            suffix={
              <img
                className="landing-icon-menu"
                src="icons/menu.svg"
                alt="menu"
              />
            }
            placeholder="Search Restaurants"
            value={searchTerm}
            onChange={onChange}
            onPressEnter={onPressEnter}
          />
        </Content>

        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </>
  );
};

export default Landing;
