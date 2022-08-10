import styles from "./MainLayout.module.scss";
import { Navbar, Button, Modal, InputFieldText } from "../../components";
import { useState } from "react";

const MainLayout = ({ component: RouteComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Navbar />
      <RouteComponent />
    </div>
  );
};

export default MainLayout;
