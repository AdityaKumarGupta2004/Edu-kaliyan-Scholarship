import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
useEffect(() => {
  try {
    const loggedInData = localStorage.getItem("loggedIn");
    const adminLoggedInData = localStorage.getItem("adminLoggedIn");
    const userData = localStorage.getItem("user");

    if (loggedInData !== null) {
      setLoggedIn(JSON.parse(loggedInData));
    }
    if (adminLoggedInData !== null) {
      setAdminLoggedIn(JSON.parse(adminLoggedInData));
    }
    if (userData !== null) {
      setUser(JSON.parse(userData));
    }
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
  }
}, []);

  //   const login = (user) => {
  //     setLoggedIn(true);
  //     setUser(user);

  //     localStorage.setItem("loggedIn", true);
  //     localStorage.setItem("user", JSON.stringify(user));
  //   };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        adminLoggedIn,
        setAdminLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
