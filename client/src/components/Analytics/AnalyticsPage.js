import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Affix, List, message } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import RestaurantAnalyticsItem from "./RestaurantAnalyticsItem";
import SkeletonItem from "components/Common/SkeletonItem";
import { useFetchCurrentUser, useRecommend } from "hooks";

const { Content, Footer } = Layout;

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
  const [isRecommending, recommend] = useRecommend();

  const [bestInCategoryData, setBestInCategoryData] = useState([]);
  const [bestInReviewContentData, setBestInReviewContentData] = useState([]);
  const [bestEachCityData, setBestEachCityData] = useState([]);
  const [bestSameCityData, setBestSameCityData] = useState([]);

  const gridConfig = {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    xxl: 6,
  };

  useEffect(() => {
    const fetchPageData = async () => {
      window.scrollTo(0, 0);

      const user = await fetchCurrentUser();
      if (!user) {
        message.error("You need to log in first!");
        navigate("/login", {
          state: { from: window.location.pathname },
        });
      } else {
        const bestInCategoryResults = await recommend({
          userId: user.userId,
          type: "BEST_IN_CATEGORY",
        });
        if (bestInCategoryResults) {
          setBestInCategoryData(bestInCategoryResults);
        }

        const bestInReviewContentResults = await recommend({
          userId: user.userId,
          type: "BEST_IN_REVIEW_CONTENT",
        });
        if (bestInReviewContentResults) {
          setBestInReviewContentData(bestInReviewContentResults);
        }

        const bestEachCityResults = await recommend({
          userId: user.userId,
          type: "BEST_EACH_CITY",
        });
        if (bestEachCityResults) {
          setBestEachCityData(bestEachCityResults);
        }

        const bestSameCityResults = await recommend({
          userId: user.userId,
          type: "BEST_SAME_CITY",
        });
        if (bestSameCityResults) {
          setBestSameCityData(bestSameCityResults);
        }
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
        <div className="analyt-items">
          <div className="analyt-item analyt-first">
            <div className="analyt-text">Must-Try Chinese Food</div>
            {isRecommending ? (
              <SkeletonItem />
            ) : (
              <List
                grid={gridConfig}
                dataSource={bestInCategoryData}
                renderItem={(item) => (
                  <List.Item>
                    <RestaurantAnalyticsItem {...item} />
                  </List.Item>
                )}
              />
            )}
          </div>

          <div className="analyt-item analyt-first">
            <div className="analyt-text">Steakhouse Choices</div>
            {isRecommending ? (
              <SkeletonItem />
            ) : (
              <List
                grid={gridConfig}
                dataSource={bestInReviewContentData}
                renderItem={(item) => (
                  <List.Item>
                    <RestaurantAnalyticsItem {...item} />
                  </List.Item>
                )}
              />
            )}
          </div>

          <div className="analyt-item analyt-first">
            <div className="analyt-text">Trending by City</div>
            {isRecommending ? (
              <SkeletonItem />
            ) : (
              <List
                grid={gridConfig}
                dataSource={bestEachCityData}
                renderItem={(item) => (
                  <List.Item>
                    <RestaurantAnalyticsItem {...item} />
                  </List.Item>
                )}
              />
            )}
          </div>

          {bestSameCityData.length === 0 ? null : (
            <div className="analyt-item analyt-first">
              <div className="analyt-text">Based on Save History</div>
              {isRecommending ? (
                <SkeletonItem />
              ) : (
                <List
                  grid={gridConfig}
                  dataSource={bestSameCityData}
                  renderItem={(item) => (
                    <List.Item>
                      <RestaurantAnalyticsItem {...item} />
                    </List.Item>
                  )}
                />
              )}
            </div>
          )}
        </div>
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default AnalyticsPage;
