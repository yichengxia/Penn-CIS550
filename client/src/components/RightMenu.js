import React, { useState, useEffect } from "react";
import { Menu, message } from "antd";
import { useFetchCurrentUser, useLogout } from "hooks";

const RightMenu = () => {
  const [fetchCurrentUser] = useFetchCurrentUser();
  const [logout] = useLogout();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchCurrentUser();
      setCurrentUser(user);
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await logout();
    setCurrentUser({});
    message.success("You have successfully logged out.");
  };

  const menuItems = [
    {
      key: "signup",
      label: "Sign up",
    },
    {
      key: "login",
      label: "Login",
    },
  ];

  return (
    <Menu
      mode="horizontal"
      className="rmenu"
      style={{ display: "flex", flexDirection: "row-reverse" }}
      items={menuItems}
    >
      {/* {currentUser ? null : <div>Login/Logout</div>} */}
    </Menu>
  );
};

export default RightMenu;
