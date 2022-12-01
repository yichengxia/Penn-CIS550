import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Affix, List, message } from "antd";
import AppHeader from "components/Header/AppHeader";
import AppFooter from "components/Footer/AppFooter";
import UserDetail from "./UserDetail";
import SavedPageDivider from "./SavedPageDivider";
import RestaurantItem from "components/RestaurantList/RestaurantItem";
import EmptyItem from "components/Common/EmptyItem";
import LoadingItem from "components/Common/LoadingItem";
import LoadingContainer from "components/Common/LoadingContainer";
import { useFetchCurrentUser, useFetchSavedRestaurants } from "hooks";
import { PAGE_SIZE } from "constants/constants";

const { Content, Footer } = Layout;

const UserPage = () => {
  const navigate = useNavigate();
  const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
  const [isFetchingSavedRestaurants, fetchSavedRestaurants] =
    useFetchSavedRestaurants();

  const [currentUser, setCurrentUser] = useState({});
  const [savedRestaurantListData, setSavedRestaurantListData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const [searchParams, setSearchParams] = useState({
    sort: "lastUpdated",
  });

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
        setCurrentUser(user);

        const savedRestaurants = await fetchSavedRestaurants({
          ...searchParams,
          userId: user.userId,
        });
        if (savedRestaurants) {
          setTotalItems(savedRestaurants.length);
          setSavedRestaurantListData(savedRestaurants);
        } else {
          message.error("Fetch saved restaurants failed!");
          navigate("/", { state: { from: window.location.pathname } });
        }
      }
    };
    fetchPageData();
  }, [searchParams]);

  return (
    <Layout>
      <Affix>
        <AppHeader />
      </Affix>

      <Content>
        {isFetchingCurrentUser ? (
          <LoadingContainer type="user" />
        ) : (
          <UserDetail username={currentUser.username} savedCount={totalItems} />
        )}

        <SavedPageDivider
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        {isFetchingSavedRestaurants ? (
          <LoadingItem />
        ) : totalItems === 0 ? (
          <EmptyItem description="No saved items" />
        ) : (
          <List
            className="user-item"
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
            dataSource={savedRestaurantListData}
            renderItem={(restaurantItem) => (
              <RestaurantItem
                restaurantItemData={restaurantItem}
                savedIcon={true}
                userId={currentUser.userId}
              />
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

export default UserPage;
