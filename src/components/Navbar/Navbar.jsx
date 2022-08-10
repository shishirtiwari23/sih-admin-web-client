import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Avatar, Menu as MUIMenu, MenuItem, IconButton } from "@mui/material";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { styled } from "@mui/system";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <header className={styles.container}>
      <div className={styles.left}>
        <p>PIB Admin</p>
      </div>
      <div className={styles.right}>
        <div className={styles.profile}>
          <Avatar onClick={handleClick} sx={{ bgcolor: "green" }}>
            A
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleClick={handleClick}
          />
          <AiFillCaretDown onClick={handleClick} />
        </div>
      </div>
    </header>
  );
};

const Menu = ({ anchorEl, setAnchorEl, handleClick }) => {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.menu}>
      <StyledMUIMenu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </StyledMUIMenu>
    </div>
  );
};

const StyledMUIMenu = styled(MUIMenu)(() => {
  return {
    top: "35px",
  };
});

export default Navbar;
