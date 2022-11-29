import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Affix, List, message } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import RestaurantDetail from "./RestaurantDetail";
import ReviewPageDivider from "./ReviewPageDivider";
import RestaurantReviewItem from "./RestaurantReviewItem";
import EmptyItem from "components/Common/EmptyItem";
import { useFetchRestaurant } from "hooks";
import { reviewListData } from "constants/mock";

const { Content, Footer } = Layout;

const RestaurantPage = () => {
  const navigate = useNavigate();
  const [fetchRestaurant] = useFetchRestaurant();

  const [restaurantItemData, setRestaurantItemData] = useState({});
  const [totalPage, setTotalPage] = useState(100);
  const [pageSize, setPageSize] = useState(10);

  const [searchParams, setSearchParams] = useState({
    rating: "",
    sort: "date",
  });

  const routeParams = useParams();
  const restaurantId = routeParams.restaurantId ? routeParams.restaurantId : "";

  useEffect(() => {
    const fetchRestaurantItem = async () => {
      window.scrollTo(0, 0);

      const result = await fetchRestaurant(restaurantId);
      if (result && result.length === 1) {
        setRestaurantItemData(result[0]);
      } else {
        message.error("Restaurant not found!");
        navigate("/", { state: { from: window.location.pathname } });
      }
    };
    fetchRestaurantItem();
  }, []);

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        <RestaurantDetail {...restaurantItemData} />

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
              onChange: () => {
                window.scrollTo(0, 0);
              },
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
