import React from "react";
import { Link } from "react-router-dom";
import { Layout, Affix } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";

const { Content, Footer } = Layout;

const NotFoundPage = () => {
  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        <>
          <img
            className="notfound-image"
            src="/images/notfound.svg"
            alt="notfound"
          />

          <div className="notfound-text">
            Return to{" "}
            <Link to="/" state={{ from: window.location.pathname }}>
              Home
            </Link>
          </div>
        </>
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default NotFoundPage;
