import { useState, useEffect, createContext } from "react";

const CurrentContext = createContext({});

export const CurrentContextProvider = ({ children }) => {
  return (
    <CurrentContext.Provider value={{}}>{children}</CurrentContext.Provider>
  );
};

export default CurrentContext;
