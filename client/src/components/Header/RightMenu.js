import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Avatar, Badge, Tooltip, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useFetchCurrentUser, useLogout } from "hooks";
import { getInitial } from "utils";

const RightMenu = () => {
  const navigate = useNavigate();
  const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
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

  const SignUp = (
    <div
      className="rmenu-text"
      onClick={() =>
        navigate("/signup", { state: { from: window.location.pathname } })
      }
    >
      Sign up
    </div>
  );

  const Login = (
    <div
      className="rmenu-text"
      onClick={() =>
        navigate("/login", { state: { from: window.location.pathname } })
      }
    >
      Login
    </div>
  );

  const Logout = (
    <div className="rmenu-text" onClick={handleLogout}>
      Log out
    </div>
  );

  const AnalyticsUnloggedIn = (
    <Tooltip placement="bottom" title={"Forx Analytics"}>
      <img
        className="rmenu-analytics"
        src="/icons/analytics.png"
        alt="analytics"
        onClick={() => {
          navigate("/login", {
            state: { from: window.location.pathname },
          });
          message.error("You need to log in first!");
        }}
      />
    </Tooltip>
  );

  const AnalyticsLoggedIn = (
    <Tooltip placement="bottom" title={"Forx Analytics"}>
      <img
        className="rmenu-analytics"
        src="/icons/analytics.png"
        alt="analytics"
        onClick={() => {
          navigate("/analytics", {
            state: { from: window.location.pathname },
          });
        }}
      />
    </Tooltip>
  );

  const menuItemsUnloggedIn = [
    {
      key: "signup",
      label: SignUp,
    },
    {
      key: "login",
      label: Login,
    },
    {
      key: "analytics",
      label: AnalyticsUnloggedIn,
    },
  ];

  const menuItemsLoggedIn = [
    {
      key: "logout",
      label: Logout,
    },
    {
      key: "avatar",
      label: (
        <Tooltip placement="bottom" title="Saved Restaurants">
          <Badge dot>
            <Avatar
              className="rmenu-avatar"
              onClick={() => {
                navigate("/user", {
                  state: { from: window.location.pathname },
                });
              }}
            >
              {getInitial(currentUser)}
            </Avatar>
          </Badge>
        </Tooltip>
      ),
    },
    {
      key: "analytics",
      label: AnalyticsLoggedIn,
    },
  ];

  return (
    <Menu
      mode="horizontal"
      style={{ display: "flex", flexDirection: "row-reverse" }}
      items={currentUser ? menuItemsLoggedIn : menuItemsUnloggedIn}
      overflowedIndicator={<MenuOutlined style={{ fontSize: "16px" }} />}
    />
  );
};

export default RightMenu;
