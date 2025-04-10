import { createContext, useContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Custom Hook for using AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider Component
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const user = localStorage.getItem("chat-user");
    return user ? JSON.parse(user) : null;
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
