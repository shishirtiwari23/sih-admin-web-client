import styles from "./Menubar.module.scss";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const Menubar = () => {
  return (
    <div className={styles.container}>
      <NavLink
        to="/upload-article"
        className={(isActive) =>
          isActive ? clsx(styles.link, styles.active) : styles.link
        }
      >
        Upload Article
      </NavLink>
    </div>
  );
};

export default Menubar;
