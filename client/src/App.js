import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppHeader from "components/AppHeader";
import AppFooter from "./components/AppFooter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/header" element={<AppHeader />} />
        <Route path="/footer" element={<AppFooter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
