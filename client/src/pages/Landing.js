import React, { useState, useEffect } from "react";
import { Layout, Input, Affix } from "antd";
import AppHeader from "components/AppHeader";
import SearchFilter from "components/SearchFilter";
import AppFooter from "components/AppFooter";

const { Content, Footer } = Layout;

const Landing = () => {
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useState({
    city: "",
    category: "",
    ratingLow: 1.0,
    ratingHigh: 5.0,
    open: "Y",
    sort: "avgRating",
  });

  let searchRef = null;
  useEffect(() => {
    searchRef.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onPressEnter = () => {
    setSearchTerm("");
  };

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
            ref={(input) => {
              searchRef = input;
            }}
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
                onClick={() => {
                  setShowSearchFilter(!showSearchFilter);
                }}
              />
            }
            placeholder="Search Restaurants"
            value={searchTerm}
            onChange={onChange}
            onPressEnter={onPressEnter}
          />

          <div>
            {!showSearchFilter ? null : (
              <div className="landing-sf">
                <SearchFilter
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              </div>
            )}
          </div>
        </Content>

        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </>
  );
};

export default Landing;
