import axios from "axios";
import { useState, useEffect, createContext } from "react";

const ArticleContext = createContext({});

export const ArticleContextProvider = ({ children }) => {
  const ARTICLE_API = axios.create({
    baseURL: process.env.REACT_APP_API_URI + "/article",
  });
  console.log(process.env.REACT_APP_API_URI);
  return (
    <ArticleContext.Provider value={{ ARTICLE_API }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;
