import React, { useState } from "react";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { Menu, Input, Tooltip } from "antd";
import SearchFilter from "components/Landing/SearchFilter";

const LeftMenu = () => {
  const navigate = useNavigate();
  let [currentSearchParams, setCurrentSearchParams] = useSearchParams();

  const [searchParams, setSearchParams] = useState({
    name: currentSearchParams.get("name")
      ? currentSearchParams.get("name")
      : "",
    city: currentSearchParams.get("city")
      ? currentSearchParams.get("city")
      : "",
    category: currentSearchParams.get("category")
      ? currentSearchParams.get("category")
      : "",
    ratingLow: currentSearchParams.get("ratingLow")
      ? currentSearchParams.get("ratingLow")
      : "1",
    ratingHigh: "5",
    open: currentSearchParams.get("open")
      ? currentSearchParams.get("open")
      : "Y",
    sort: currentSearchParams.get("sort")
      ? currentSearchParams.get("sort")
      : "avgRating",
  });

  const [showSearchFilter, setShowSearchFilter] = useState(false);

  const onInputChange = (e) => {
    setSearchParams({ ...searchParams, name: e.target.value });
  };

  const navigateToSearch = () => {
    navigate(
      {
        pathname: "/restaurants",
        search: `?${createSearchParams(searchParams)}`,
      },
      { state: { from: window.location.pathname } }
    );

    if (window.location.pathname === "/restaurants") {
      window.location.reload();
    }
  };

  const menuItems = [
    {
      key: "logo",
      label: (
        <div className="lmenu-logo-container">
          <img
            className="lmenu-logo"
            src="/images/logo-sm.svg"
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
          value={searchParams.name}
          onChange={onInputChange}
          onPressEnter={navigateToSearch}
          prefix={
            <img
              className="lmenu-icon-search"
              src="/icons/search.svg"
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
                src="/icons/menu.svg"
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
    <>
      <Menu
        mode="horizontal"
        style={{ display: "flex" }}
        items={menuItems}
        disabledOverflow="true"
      />

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
    </>
  );
};

export default LeftMenu;
