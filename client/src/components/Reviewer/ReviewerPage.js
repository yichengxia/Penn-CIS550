import React, { useState } from "react";
import { Layout, Affix, List, Empty } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import ReviewItem from "./ReviewItem";
import { reviewListData } from "constants/mock";

const { Content, Footer } = Layout;

const ReviewerPage = () => {
  const [totalPage, setTotalPage] = useState(100);
  const [pageSize, setPageSize] = useState(10);

  // fetch reviewer, send an error message and return to landing page if id not found

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        {totalPage === 0 ? (
          <Empty className="reviewer-empty" description="No reviews yet" />
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
            }}
            dataSource={reviewListData}
            renderItem={(reviewItem) => <ReviewItem {...reviewItem} />}
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
