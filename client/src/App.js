import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import AppFooter from "./components/Footer/AppFooter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/footer" element={<AppFooter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
