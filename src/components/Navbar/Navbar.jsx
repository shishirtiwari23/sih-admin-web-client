import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const Navbar = () => {
  return (
    <header className={styles.container}>
      <NavLink
        to="/"
        className={(isActive) =>
          isActive ? clsx(styles.link, styles.active) : styles.link
        }
      >
        Home
      </NavLink>
    </header>
  );
};

export default Navbar;
