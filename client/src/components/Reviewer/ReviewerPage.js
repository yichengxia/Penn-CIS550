import React, { useState } from "react";
import { Layout, Affix, List } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import ReviewerDetail from "./ReviewerDetail";
import ReviewPageDivider from "components/Restaurant/ReviewPageDivider";
import ReviewItem from "./ReviewItem";
import EmptyItem from "components/Common/EmptyItem";
import { reviewListData, reviewerItemData } from "constants/mock";

const { Content, Footer } = Layout;

const ReviewerPage = () => {
  const [totalPage, setTotalPage] = useState(100);
  const [pageSize, setPageSize] = useState(10);

  const [searchParams, setSearchParams] = useState({
    rating: "",
    sort: "date",
  });

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  // fetch reviewer, send an error message and return to landing page if id not found

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        <ReviewerDetail {...reviewerItemData} />

        <ReviewPageDivider
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        {totalPage === 0 ? (
          <EmptyItem description="No reviews yet" />
        ) : (
          <List
            className="reviewer-item"
            itemLayout="vertical"
            size="large"
            pagination={{
              total: totalPage,
              pageSize,
              hideOnSinglePage: true,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total}`,
              onChange: () => {
                window.scrollTo(0, 0);
              },
            }}
            dataSource={reviewListData}
            renderItem={(reviewItemData) => <ReviewItem {...reviewItemData} />}
          />
        )}
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default ReviewerPage;
