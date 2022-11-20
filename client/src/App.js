import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppHeader from "components/AppHeader";
import AppFooter from "./components/AppFooter";
import SearchFilter from "components/SearchFilter";
import RestaurantList from "pages/RestaurantList";
import RestaurantItem from "components/RestaurantItem";
import Restaurant from "pages/Restaurant";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/header" element={<AppHeader />} />
        <Route path="/footer" element={<AppFooter />} />
        <Route path="/filter" element={<SearchFilter />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurant_item" element={<RestaurantItem />} />
        <Route path="/restaurant/:restaurantId" element={<Restaurant />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
