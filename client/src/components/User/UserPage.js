import React, { useState } from "react";
import { Layout, Affix } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import UserDetail from "./UserDetail";
import SavedPageDivider from "./SavedPageDivider";

const { Content, Footer } = Layout;

const UserPage = () => {
  // add route protection: check logged in or not
  // display no data if no saved item

  const [searchParams, setSearchParams] = useState({
    sort: "lastUpdated",
  });

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  return (
    // pass props to UserDetail
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        <UserDetail />

        <SavedPageDivider
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default UserPage;
