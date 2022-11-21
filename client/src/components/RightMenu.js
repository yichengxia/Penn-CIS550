import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Avatar, Badge, Tooltip, message } from "antd";
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

  const InsightsUnloggedIn = (
    <Tooltip placement="bottom" title={"Forx Insights 🔥"}>
      <img
        className="rmenu-insights"
        src="/icons/insights.png"
        alt="insights"
        onClick={() => {
          navigate("/login", {
            state: { from: window.location.pathname },
          });
          message.error("You need to log in first!");
        }}
      />
    </Tooltip>
  );

  const InsightsLoggedIn = (
    <Tooltip placement="bottom" title={"Forx Insights 🔥"}>
      <img
        className="rmenu-insights"
        src="/icons/insights.png"
        alt="insights"
        onClick={() => {
          navigate("/insights", {
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
      key: "insights",
      label: InsightsUnloggedIn,
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
      key: "insights",
      label: InsightsLoggedIn,
    },
  ];

  return (
    <Menu
      mode="horizontal"
      style={{ display: "flex", flexDirection: "row-reverse" }}
      items={currentUser ? menuItemsLoggedIn : menuItemsUnloggedIn}
      disabledOverflow="true"
    ></Menu>
  );
};

export default RightMenu;
