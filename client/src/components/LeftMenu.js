import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Input, Tooltip } from "antd";
import SearchFilter from "components/SearchFilter";

const LeftMenu = () => {
  const navigate = useNavigate();

  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useState({
    city: "",
    category: "",
    ratingLow: 1.0,
    ratingHigh: 5.0,
    open: "Y",
    sort: "avgRating",
  });

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const search = () => {
    // call search hook
    navigate("/restaurants", { state: { from: window.location.pathname } });
  };

  const menuItems = [
    {
      key: "logo",
      label: (
        <div className="lmenu-logo-container">
          <img
            className="lmenu-logo"
            src="images/logo-sm.svg"
            alt="logo-sm"
            onClick={() => {
              navigate("/", { state: { from: window.location.pathname } });
            }}
          />
        </div>
      ),
    },
    {
      key: "search",
      label: (
        <Input
          className="lmenu-input"
          size="medium"
          placeholder="Search Restaurants"
          value={searchTerm}
          onChange={onInputChange}
          onPressEnter={search}
          prefix={
            <img
              className="lmenu-icon-search"
              src="icons/search.svg"
              alt="search"
            />
          }
          suffix={
            <Tooltip
              placement="bottom"
              title={showSearchFilter ? "Hide Filter" : "Show Filter"}
            >
              <img
                className="lmenu-icon-menu"
                src="icons/menu.svg"
                alt="menu"
                onClick={() => {
                  setShowSearchFilter(!showSearchFilter);
                }}
              />
            </Tooltip>
          }
        />
      ),
    },
  ];

  return window.location.pathname === "/" ? null : (
    <div>
      <Menu
        mode="horizontal"
        style={{ display: "flex" }}
        disabledOverflow="true"
        items={menuItems}
      ></Menu>
      <div>
        {!showSearchFilter ? null : (
          <div className="lmenu-sf">
            <SearchFilter
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftMenu;
