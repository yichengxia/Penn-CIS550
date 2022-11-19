import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Affix, Tooltip } from "antd";
import AppHeader from "components/AppHeader";
import SearchFilter from "components/SearchFilter";
import AppFooter from "components/AppFooter";

const { Content, Footer } = Layout;

const Landing = () => {
  const navigate = useNavigate();

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

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const search = () => {
    // call search hook
    navigate("/restaurants", { state: { from: window.location.pathname } });
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
            placeholder="Search Restaurants"
            ref={(input) => {
              searchRef = input;
            }}
            value={searchTerm}
            onChange={onInputChange}
            onPressEnter={search}
            prefix={
              <img
                className="landing-icon-search"
                src="icons/search.svg"
                alt="search"
              />
            }
            suffix={
              <Tooltip
                placement="bottom"
                title={showSearchFilter ? "Hide Filter" : "Show Filter"}
              >
                <img
                  className="landing-icon-menu"
                  src="icons/menu.svg"
                  alt="menu"
                  onClick={() => {
                    setShowSearchFilter(!showSearchFilter);
                  }}
                />
              </Tooltip>
            }
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
