import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Avatar, Tooltip, message } from "antd";
import { useFetchCurrentUser, useLogout } from "hooks";
import { getInitial } from "utils";

const RightMenu = () => {
  const navigate = useNavigate();
  const [fetchCurrentUser] = useFetchCurrentUser();
  const [logout] = useLogout();
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        setCurrentUser(user.username);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await logout();
    setCurrentUser("");
    message.success("You have successfully logged out.");
    if (window.location.pathname === "/") {
      window.location.reload();
    }
    navigate("/", { state: { from: window.location.pathname } });
  };

  const menuItemsUnloggedIn = [
    {
      key: "signup",
      label: (
        <div
          className="rmenu-text"
          onClick={() =>
            navigate("/signup", { state: { from: window.location.pathname } })
          }
        >
          Sign up
        </div>
      ),
    },
    {
      key: "login",
      label: (
        <div
          className="rmenu-text"
          onClick={() =>
            navigate("/login", { state: { from: window.location.pathname } })
          }
        >
          Login
        </div>
      ),
    },
    {
      key: "insights",
      label: (
        <Tooltip placement="bottom" title={"Forx Insights 🔥"}>
          <img
            className="rmenu-insights"
            src="icons/insights.png"
            alt="insights"
            onClick={() => {
              navigate("/login", {
                state: { from: window.location.pathname },
              });
              message.error("You need to log in first!");
            }}
          />
        </Tooltip>
      ),
    },
  ];

  const menuItemsLoggedIn = [
    {
      key: "logout",
      label: (
        <div className="rmenu-text" onClick={handleLogout}>
          Log out
        </div>
      ),
    },
    {
      key: "avatar",
      label: (
        <Tooltip placement="bottom" title="Saved Restaurants">
          <Avatar className="rmenu-avatar">{getInitial(currentUser)}</Avatar>
        </Tooltip>
      ),
      // onClick: () => navigate("/user"), navigate to saved restaurants page
    },
    {
      key: "insights",
      label: (
        <Tooltip placement="bottom" title={"Forx Insights 🔥"}>
          <img
            className="rmenu-insights"
            src="icons/insights.png"
            alt="insights"
          />
        </Tooltip>
      ),
      // onClick: () => navigate("/insights"), navigate to insights page
    },
  ];

  return (
    <Menu
      mode="horizontal"
      style={{ display: "flex", flexDirection: "row-reverse" }}
      disabledOverflow="true"
      items={currentUser ? menuItemsLoggedIn : menuItemsUnloggedIn}
    ></Menu>
  );
};

export default RightMenu;
