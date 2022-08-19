import styles from "./Menubar.module.scss";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  Drawer,
  Box,
  List,
  Toolbar,
  Divider,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { AiFillHome } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";
import { SiGoogleanalytics } from "react-icons/si";
import { styled } from "@mui/system";

const Menubar = () => {
  const drawerWidth = 240;
  return (
    <div className={styles.container}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <StyledListItem disablePadding>
              <NavLink
                className={(isActive) =>
                  isActive ? clsx(styles.link, styles.active) : styles.link
                }
                to="/"
              >
                <ListItemButton>
                  <StyledListItemIcon>
                    <AiFillHome />
                  </StyledListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </NavLink>
            </StyledListItem>
            <StyledListItem disablePadding>
              <NavLink
                className={(isActive) =>
                  isActive ? clsx(styles.link, styles.active) : styles.link
                }
                to="/articles/upload"
              >
                <ListItemButton>
                  <StyledListItemIcon>
                    <MdCloudUpload />
                  </StyledListItemIcon>
                  <ListItemText primary={"Upload Article"} />
                </ListItemButton>
              </NavLink>
            </StyledListItem>
            <StyledListItem disablePadding>
              <NavLink
                className={(isActive) =>
                  isActive ? clsx(styles.link, styles.active) : styles.link
                }
                to="/articles/manage"
              >
                <ListItemButton>
                  <StyledListItemIcon>
                    <MdCloudUpload />
                  </StyledListItemIcon>
                  <ListItemText primary={"Manage Articles"} />
                </ListItemButton>
              </NavLink>
            </StyledListItem>
            <StyledListItem disablePadding>
              <NavLink
                className={(isActive) =>
                  isActive ? clsx(styles.link, styles.active) : styles.link
                }
                to="/live"
              >
                <ListItemButton>
                  <StyledListItemIcon>
                    <RiLiveFill />
                  </StyledListItemIcon>
                  <ListItemText primary={"Live"} />
                </ListItemButton>
              </NavLink>
            </StyledListItem>
            <StyledListItem disablePadding>
              <NavLink
                className={(isActive) =>
                  isActive ? clsx(styles.link, styles.active) : styles.link
                }
                to="/analytics"
              >
                <ListItemButton>
                  <StyledListItemIcon>
                    <SiGoogleanalytics />
                  </StyledListItemIcon>
                  <ListItemText primary={"Analytics"} />
                </ListItemButton>
              </NavLink>
            </StyledListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

const StyledListItem = styled(ListItem)(() => {
  return {
    ".MuiListItemText-root": {
      span: {
        fontSize: "0.9rem",
      },
    },
  };
});

const StyledListItemIcon = styled(ListItemIcon)(() => {
  return {
    width: 20,
    height: 20,

    svg: {
      width: "100%",
      height: "100%",
    },
  };
});

export default Menubar;
