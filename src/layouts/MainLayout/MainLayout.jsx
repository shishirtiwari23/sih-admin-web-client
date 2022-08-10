import styles from "./MainLayout.module.scss";
import { Navbar, Menubar } from "../../components";
import { Children, useState } from "react";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Menubar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
