import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Layout, Affix, List, message } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import RestaurantDetail from "./RestaurantDetail";
import ReviewPageDivider from "./ReviewPageDivider";
import RestaurantReviewItem from "./RestaurantReviewItem";
import EmptyItem from "components/Common/EmptyItem";
import { useFetchReviews, useFetchRestaurant } from "hooks";

const { Content, Footer } = Layout;

const RestaurantPage = () => {
  const navigate = useNavigate();
  const [fetchRestaurant] = useFetchRestaurant();
  const [fetchReviews] = useFetchReviews();

  const [restaurantItemData, setRestaurantItemData] = useState({});
  const [reviewListData, setReviewListData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const routeParams = useParams();
  const restaurantId = routeParams.restaurantId ? routeParams.restaurantId : "";

  let [currentSearchParams, setCurrentSearchParams] = useSearchParams();
  const [searchParams, setSearchParams] = useState({
    rating: currentSearchParams.get("rating")
      ? +currentSearchParams.get("rating")
      : "",
    sort: currentSearchParams.get("sort")
      ? currentSearchParams.get("sort")
      : "date",
  });

  useEffect(() => {
    const fetchPageData = async () => {
      window.scrollTo(0, 0);

      const restaurantResults = await fetchRestaurant(restaurantId);
      if (restaurantResults && restaurantResults.length === 1) {
        setRestaurantItemData(restaurantResults[0]);
      } else {
        message.error("Restaurant not found!");
        navigate("/", { state: { from: window.location.pathname } });
      }

      const reviewResults = await fetchReviews({
        ...searchParams,
        restaurantId,
      });
      if (reviewResults) {
        setTotalPages(reviewResults.length);
        setReviewListData(reviewResults);
      } else {
        message.error("Unable to load reviews!");
        navigate("/", { state: { from: window.location.pathname } });
      }
    };
    fetchPageData();
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

        {totalPages === 0 ? (
          <EmptyItem description="No reviews yet" />
        ) : (
          <List
            className="rest-item"
            itemLayout="vertical"
            size="large"
            pagination={{
              total: totalPages,
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
