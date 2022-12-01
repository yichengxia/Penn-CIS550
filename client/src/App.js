import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "components/Landing/LandingPage";
import LoginPage from "components/Auth/LoginPage";
import SignupPage from "components/Auth/SignupPage";
import RestaurantListPage from "components/RestaurantList/RestaurantListPage";
import RestaurantPage from "components/Restaurant/RestaurantPage";
import ReviewerPage from "components/Reviewer/ReviewerPage";
import UserPage from "components/User/UserPage";
import AnalyticsPage from "components/Analytics/AnalyticsPage";
import NotFoundPage from "components/NotFound/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/restaurants" element={<RestaurantListPage />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantPage />} />
        <Route path="/reviewer/:reviewerId" element={<ReviewerPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
