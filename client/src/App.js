import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "pages/LandingPage";
import LoginPage from "pages/LoginPage";
import SignupPage from "pages/SignupPage";
import RestaurantListPage from "pages/RestaurantListPage";
import RestaurantPage from "pages/RestaurantPage";
import ReviewerPage from "pages/ReviewerPage";
import UserPage from "pages/UserPage";
import InsightsPage from "pages/InsightsPage";

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
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
