import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppHeader from "components/AppHeader";
import AppFooter from "./components/AppFooter";
import SearchFilter from "components/SearchFilter";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
