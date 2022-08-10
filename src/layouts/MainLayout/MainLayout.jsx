import styles from "./MainLayout.module.scss";
import { Navbar, Menubar } from "../../components";
import { useState } from "react";

const MainLayout = ({ component: RouteComponent }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Menubar />
      <main>
        <RouteComponent />
      </main>
    </div>
  );
};

export default MainLayout;
