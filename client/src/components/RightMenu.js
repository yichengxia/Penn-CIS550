import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, message } from "antd";
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
      setCurrentUser(user.username);
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await logout();
    setCurrentUser("");
    message.success("You have successfully logged out.");
    // navigate("/");
  };

  const menuItemsUnloggedIn = [
    {
      key: "signup",
      label: "Sign up",
      onClick: () => navigate("/signup"),
    },
    {
      key: "login",
      label: "Login",
      onClick: () => navigate("/login"),
    },
  ];

  const menuItemsLoggedIn = [
    {
      key: "logout",
      label: "Log out",
      onClick: handleLogout,
    },
    {
      key: "avatar",
      label: (
        <Avatar
          style={{
            verticalAlign: "middle",
            backgroundColor: "#25c8c1",
          }}
        >
          {getInitial(currentUser)}
        </Avatar>
      ),
      // onClick: () => navigate("/user"), navigate to saved restaurants page
    },
  ];

  return (
    <Menu
      mode="horizontal"
      className="rmenu"
      style={{ display: "flex", flexDirection: "row-reverse" }}
      disabledOverflow="true" // TBD
      items={currentUser ? menuItemsLoggedIn : menuItemsUnloggedIn}
    ></Menu>
  );
};

export default RightMenu;
