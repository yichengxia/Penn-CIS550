import React from "react";

const LeftMenu = () => {
  return window.location.pathname === "/" ? null : (
    <>
      <img src="images/logo-sm.svg" alt="logo-sm" />
    </>
  );
};

export default LeftMenu;
