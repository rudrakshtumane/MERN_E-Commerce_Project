/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import authService from '../service/AuthService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("role");

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await authService.getUser();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
