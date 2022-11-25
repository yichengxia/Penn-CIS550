import React, { useState } from "react";
import { Layout, Affix, List } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import ReviewPageDivider from "./ReviewPageDivider";
import RestaurantReviewItem from "./RestaurantReviewItem";
import EmptyItem from "components/Common/EmptyItem";
import { reviewListData } from "constants/mock";

const { Content, Footer } = Layout;

const RestaurantPage = () => {
  const [totalPage, setTotalPage] = useState(100);
  const [pageSize, setPageSize] = useState(10);

  const [searchParams, setSearchParams] = useState({
    rating: "",
    sort: "date",
  });

  // fetch restaurant, send an error message and return to landing page if id not found

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        <ReviewPageDivider
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        {totalPage === 0 ? (
          <EmptyItem description="No reviews yet" />
        ) : (
          <List
            className="rest-item"
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
            renderItem={(reviewItem) => (
              <RestaurantReviewItem {...reviewItem} />
            )}
          />
        )}
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default RestaurantPage;
