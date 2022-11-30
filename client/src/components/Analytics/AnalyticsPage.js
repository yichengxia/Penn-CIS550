import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Affix, List, message } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import RestaurantAnalyticsItem from "./RestaurantAnalyticsItem";
import { useFetchCurrentUser, useRecommend } from "hooks";

const { Content, Footer } = Layout;

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [fetchCurrentUser] = useFetchCurrentUser();
  const [recommend] = useRecommend();

  const [userId, setUserId] = useState(0);
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
    const fetchUser = async () => {
      window.scrollTo(0, 0);

      const user = await fetchCurrentUser();
      if (user) {
        setUserId(user.userId);
      } else {
        message.error("You need to log in first!");
        navigate("/login", {
          state: { from: window.location.pathname },
        });
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBestInCategoryData = async () => {
      const results = await recommend({
        userId,
        type: "BEST_IN_CATEGORY",
      });
      if (results) {
        setBestInCategoryData(results);
      } else {
        message.error("Analytics data retrieval failed!");
        navigate("/", { state: { from: window.location.pathname } });
      }
    };
    fetchBestInCategoryData();
  }, [userId]);

  useEffect(() => {
    const fetchBestInReviewContentData = async () => {
      const results = await recommend({
        userId,
        type: "BEST_IN_REVIEW_CONTENT",
      });
      if (results) {
        setBestInReviewContentData(results);
      } else {
        message.error("Analytics data retrieval failed!");
        navigate("/", { state: { from: window.location.pathname } });
      }
    };
    fetchBestInReviewContentData();
  }, [userId]);

  useEffect(() => {
    const fetchBestEachCityData = async () => {
      const results = await recommend({
        userId,
        type: "BEST_EACH_CITY",
      });
      if (results) {
        setBestEachCityData(results);
      } else {
        message.error("Analytics data retrieval failed!");
        navigate("/", { state: { from: window.location.pathname } });
      }
    };
    fetchBestEachCityData();
  }, [userId]);

  useEffect(() => {
    const fetchBestSameCityData = async () => {
      const results = await recommend({
        userId,
        type: "BEST_SAME_CITY",
      });
      if (results) {
        setBestSameCityData(results);
      } else {
        message.error("Analytics data retrieval failed!");
        navigate("/", { state: { from: window.location.pathname } });
      }
    };
    fetchBestSameCityData();
  }, [userId]);

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        <div className="analyt-items">
          <div className="analyt-item analyt-first">
            <div className="analyt-text">Must-Try Chinese Food in Arizona</div>
            <List
              grid={gridConfig}
              dataSource={bestInCategoryData}
              renderItem={(item) => (
                <List.Item>
                  <RestaurantAnalyticsItem {...item} />
                </List.Item>
              )}
            />
          </div>

          <div className="analyt-item analyt-first">
            <div className="analyt-text">Steakhouse Choices in Phoenix</div>
            <List
              grid={gridConfig}
              dataSource={bestInReviewContentData}
              renderItem={(item) => (
                <List.Item>
                  <RestaurantAnalyticsItem {...item} />
                </List.Item>
              )}
            />
          </div>

          <div className="analyt-item analyt-first">
            <div className="analyt-text">Trending by City in Arizona</div>
            <List
              grid={gridConfig}
              dataSource={bestEachCityData}
              renderItem={(item) => (
                <List.Item>
                  <RestaurantAnalyticsItem {...item} />
                </List.Item>
              )}
            />
          </div>

          {bestSameCityData.length === 0 ? null : (
            <div className="analyt-item analyt-first">
              <div className="analyt-text">
                Recommended Restaurants in {bestSameCityData[0].city} based on
                Your Save History
              </div>
              <List
                grid={gridConfig}
                dataSource={bestSameCityData}
                renderItem={(item) => (
                  <List.Item>
                    <RestaurantAnalyticsItem {...item} />
                  </List.Item>
                )}
              />
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
