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
import { MdCloudUpload, MdOutlineArticle } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";
import { TbPresentationAnalytics } from "react-icons/tb";
import { styled } from "@mui/system";
import { IoMdSettings, IoMdAdd } from "react-icons/io";

const navData = [
  {
    name: "Home",
    icon: <AiFillHome />,
    to: "/",
  },
  {
    name: "Article",
    icon: <MdOutlineArticle />,
    // to:'',
    item: [
      {
        name: "Upload",
        icon: <MdCloudUpload />,
        to: "/articles/upload",
      },
      {
        name: "Manage",
        icon: <IoMdSettings />,
        to: "/articles/manage ",
      },
    ],
  },
  {
    name: "Livestream",
    icon: <RiLiveFill />,
    // to:'/',
    item: [
      {
        name: "Add",
        icon: <IoMdAdd />,
        to: "/livestream/add",
      },
      {
        name: "Manage",
        icon: <IoMdSettings />,
        to: "/livestream/manage",
      },
    ],
  },
  {
    name: "Analytics",
    icon: <TbPresentationAnalytics />,
    to: "/analytics",
  },
];

const NavSection = ({ data }) => {
  return (
    <section className={styles.navSection}>
      <StyledListItem disablePadding>
        {data?.to ? (
          <NavLink
            className={(isActive) =>
              isActive
                ? clsx(styles.link, styles.active, styles.subHeading)
                : styles.link
            }
            to={data.to}
          >
            <ListItemButton>
              <StyledListItemIcon>{data?.icon}</StyledListItemIcon>
              <ListItemText primary={data?.name} />
            </ListItemButton>
          </NavLink>
        ) : (
          <ListItem>
            <StyledListItemIcon>{data?.icon}</StyledListItemIcon>
            <ListItemText primary={data?.name} />
          </ListItem>
        )}
      </StyledListItem>
      <div className={styles.subList}>
        {data?.item?.map((item) => (
          <StyledListItem disablePadding>
            <NavLink
              className={(isActive) =>
                isActive ? clsx(styles.link, styles.active) : styles.link
              }
              to={item?.to}
            >
              <ListItemButton>
                <StyledListItemIcon sx={{ marginLeft: 4 }}>
                  {item?.icon}
                </StyledListItemIcon>
                <ListItemText primary={item?.name} />
              </ListItemButton>
            </NavLink>
          </StyledListItem>
        ))}
      </div>
      <div className={styles.horizontalLine}></div>
    </section>
  );
};

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
            {navData?.map((item) => {
              return <NavSection data={item} />;
            })}
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
