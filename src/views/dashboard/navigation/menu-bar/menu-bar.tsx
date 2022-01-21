import React, { Fragment, useRef, useCallback, useState } from 'react';
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Hidden,
  Tooltip,
  withStyles,
  withWidth,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ImageIcon from "@material-ui/icons/Image";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import NavigationDrawer from '../../../../components/common/navigation-drawer/navigation-drawer';
import { DASHBOARD_PATH } from '../../../../constants/paths';


const styles = (theme: any) => ({
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    width: theme.spacing(7),
    overflowX: "hidden",
    marginTop: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    backgroundColor: theme.palette.common.black,
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  justifyCenter: {
    justifyContent: "center",
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});


const MenuBar = (props: any) => {

  const { selectedTab, classes } = props;
  // Will be use to make website more accessible by screen readers
  const links = useRef<any>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  const menuItems = [
    {
      link: DASHBOARD_PATH,
      name: "Dashboard",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DashboardIcon
            className={
              selectedTab === "Dashboard" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <DashboardIcon className="text-white" />,
      },
    },
    {
      link: "/c/posts",
      name: "Posts",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <ImageIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <ImageIcon className="text-white" />,
      },
    },
    {
      link: "/c/subscription",
      name: "Subscription",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <AccountBalanceIcon
            className={
              selectedTab === "Subscription"
                ? classes.textPrimary
                : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <AccountBalanceIcon className="text-white" />,
      },
    },
    {
      link: "/",
      name: "Logout",
      icon: {
        desktop: (
          <PowerSettingsNewIcon className="text-white" fontSize="small" />
        ),
        mobile: <PowerSettingsNewIcon className="text-white" />,
      },
    },
  ];

  return <Fragment>
    <Hidden xsDown>
      <Drawer //  both drawers can be combined into one for performance
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={false}
      >
        <List>
          {menuItems.map((element, index) => (
            <Link
              to={element.link}
              className={classes.menuLink}
              onClick={element.onClick}
              key={index}
            // ref={(node) => {
            //   links.current[index] = 1;
            // }}
            >
              <Tooltip
                title={element.name}
                placement="right"
                key={element.name}
              >
                <ListItem
                  selected={selectedTab === element.name}
                  button
                  divider={index !== menuItems.length - 1}
                  className={classes.permanentDrawerListItem}
                  onClick={() => {
                    console.log('index', index)
                    links?.current[index]?.click();
                  }}
                  aria-label={
                    element.name === "Logout"
                      ? "Logout"
                      : `Go to ${element.name}`
                  }
                >
                  <ListItemIcon className={classes.justifyCenter}>
                    {element.icon.desktop}
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            </Link>
          ))}
        </List>
      </Drawer>
      <NavigationDrawer
        menuItems={menuItems.map((element) => ({
          link: element.link,
          name: element.name,
          icon: element.icon.mobile,
          onClick: element.onClick,
        }))}
        anchor="left"
        open={isMobileOpen}
        selectedItem={selectedTab}
        onClose={closeMobileDrawer}
      />

    </Hidden>
  </Fragment>;
};

export default withWidth()(withStyles(styles as {}, { withTheme: true })(MenuBar));
