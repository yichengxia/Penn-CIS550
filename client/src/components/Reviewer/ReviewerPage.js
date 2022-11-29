import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Affix, List, message } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import ReviewerDetail from "./ReviewerDetail";
import ReviewPageDivider from "components/Restaurant/ReviewPageDivider";
import ReviewItem from "./ReviewItem";
import EmptyItem from "components/Common/EmptyItem";
import { useFetchReviewer, useFetchReviews } from "hooks";

const { Content, Footer } = Layout;

const ReviewerPage = () => {
  const navigate = useNavigate();
  const [fetchReviewer] = useFetchReviewer();
  const [fetchReviews] = useFetchReviews();

  const [reviewerItemData, setReviewerItemData] = useState({});
  const [reviewListData, setReviewListData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

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
        message.error("Reviewer not found!");
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
        setTotalPages(reviewResults.length);
        setReviewListData(reviewResults);
      } else {
        message.error("Unable to load reviews!");
        navigate("/", { state: { from: window.location.pathname } });
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
        <ReviewerDetail {...reviewerItemData} />

        <ReviewPageDivider
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        {totalPages === 0 ? (
          <EmptyItem description="No reviews yet" />
        ) : (
          <List
            className="reviewer-item"
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
