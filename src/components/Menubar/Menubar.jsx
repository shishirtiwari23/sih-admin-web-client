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
import {
  AiOutlineNotification,
  AiOutlineSetting,
  AiOutlineUpload,
} from "react-icons/ai";
import { MdOutlineArticle } from "react-icons/md";
import { RiHome5Line, RiLiveLine } from "react-icons/ri";
import { TbPresentationAnalytics } from "react-icons/tb";
import { styled } from "@mui/system";
import { IoMdAdd } from "react-icons/io";

const navData = [
  {
    name: "Home",
    icon: <RiHome5Line />,
    to: "/",
  },
  {
    name: "Article",
    icon: <MdOutlineArticle />,
    // to:'',
    item: [
      {
        name: "Upload",
        icon: <AiOutlineUpload />,
        to: "/articles/upload",
      },
      {
        name: "Manage",
        icon: <AiOutlineSetting />,
        to: "/articles/manage ",
      },
    ],
  },
  {
    name: "Livestream",
    icon: <RiLiveLine />,
    // to:'/',
    item: [
      {
        name: "Add",
        icon: <IoMdAdd />,
        to: "/livestream/add",
      },
      {
        name: "Manage",
        icon: <AiOutlineSetting />,
        to: "/livestream/manage",
      },
    ],
  },
  {
    name: "Push Notification",
    icon: <AiOutlineNotification />,
    to: "/notification",
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
        {data?.item?.map((item, index) => (
          <StyledListItem key={index} disablePadding>
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
            {navData?.map((item, index) => {
              return <NavSection key={index} data={item} />;
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
