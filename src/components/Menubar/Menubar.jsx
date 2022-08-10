import styles from "./Menubar.module.scss";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const Menubar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavLink
          to="/"
          className={(isActive) =>
            isActive ? clsx(styles.link, styles.active) : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/upload-article"
          className={(isActive) =>
            isActive ? clsx(styles.link, styles.active) : styles.link
          }
        >
          Upload Article
        </NavLink>
        <NavLink
          to="/live"
          className={(isActive) =>
            isActive ? clsx(styles.link, styles.active) : styles.link
          }
        >
          Live
        </NavLink>
        <NavLink
          to="/analysis"
          className={(isActive) =>
            isActive ? clsx(styles.link, styles.active) : styles.link
          }
        >
          Analysis
        </NavLink>
      </div>
    </div>
  );
};

export default Menubar;
