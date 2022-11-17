import React from "react";
import { useNavigate } from "react-router-dom";

const LeftMenu = () => {
  const navigate = useNavigate();

  return window.location.pathname === "/" ? null : (
    <>
      <img
        className="lmenu-logo"
        src="images/logo-sm.svg"
        alt="logo-sm"
        onClick={() => navigate("/")}
      />
    </>
  );
};

export default LeftMenu;
