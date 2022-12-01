import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Affix, List, message } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import ReviewerDetail from "./ReviewerDetail";
import ReviewPageDivider from "components/Restaurant/ReviewPageDivider";
import ReviewItem from "./ReviewItem";
import EmptyItem from "components/Common/EmptyItem";
import LoadingItem from "components/Common/LoadingItem";
import LoadingContainer from "components/Common/LoadingContainer";
import { useFetchReviewer, useFetchReviews } from "hooks";
import { PAGE_SIZE } from "constants/constants";

const { Content, Footer } = Layout;

const ReviewerPage = () => {
  const navigate = useNavigate();
  const [isFetchingReviewer, fetchReviewer] = useFetchReviewer();
  const [isFetchingReviews, fetchReviews] = useFetchReviews();

  const [reviewerItemData, setReviewerItemData] = useState({});
  const [reviewListData, setReviewListData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const [searchParams, setSearchParams] = useState({
    rating: "",
    sort: "date",
  });

  const routeParams = useParams();
  const reviewerId = routeParams.reviewerId ? routeParams.reviewerId : "";

  useEffect(() => {
    const fetchReviewerData = async () => {
      window.scrollTo(0, 0);

      const reviewerResults = await fetchReviewer(reviewerId);
      if (reviewerResults && reviewerResults.length === 1) {
        setReviewerItemData(reviewerResults[0]);
      } else {
        message.error("Reviewer id does not exist!");
        navigate("/", { state: { from: window.location.pathname } });
      }
    };
    fetchReviewerData();
  }, []);

  useEffect(() => {
    const fetchReviewsData = async () => {
      const reviewResults = await fetchReviews({
        ...searchParams,
        reviewerId,
      });
      if (reviewResults) {
        setTotalItems(reviewResults.length);
        setReviewListData(reviewResults);
      }
    };
    fetchReviewsData();
  }, [searchParams]);

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        {isFetchingReviewer ? (
          <LoadingContainer type="reviewer" />
        ) : (
          <ReviewerDetail {...reviewerItemData} />
        )}

        <ReviewPageDivider
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        {isFetchingReviews ? (
          <LoadingItem />
        ) : totalItems === 0 ? (
          <EmptyItem description="No reviews yet" />
        ) : (
          <List
            className="reviewer-item"
            itemLayout="vertical"
            size="large"
            pagination={{
              total: totalItems,
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
