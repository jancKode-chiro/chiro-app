import { Fragment, useRef, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Box,
  withStyles,
  isWidthUp,
  withWidth,
} from "@material-ui/core";

import Balance from "./balance/balance";
import NotificationPopperButton from "./message-popper-button/notificationpopper-button";

import Contact from "@material-ui/icons/ContactMailOutlined"
import Message from "@material-ui/icons/Message";

import User from "@material-ui/icons/VerifiedUserOutlined"
import Payment from "@material-ui/icons/PaymentOutlined";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
// import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MenuIcon from "@material-ui/icons/Menu";
import HelpOutline from "@material-ui/icons/HelpOutline";
import NavigationDrawer from "../../../../components/common/navigation-drawer/navigation-drawer";
import { useAuth } from "../../../../context/auth-context";
import { useQuery } from "react-query";
import { getBalance } from "../../../../api/payments";
import { usePayment } from "../../../../context/payment-context";
import { getUser } from "../../../../api/users";
import userIcon from '../../../../assets/images/icons/user.png'
// import { isEmpty } from "lodash";


const styles = (theme: any) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  accountAvatar: {
    backgroundColor: theme.palette.secondary.main,
    height: 24,
    width: 24,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
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
  smBordered: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "50% !important",
    },
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 800,
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2),
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

const NavBar = (props: any) => {
  const {
    selectedTab,
    messages,
    classes,
    width,
    openAddBalanceDialog
  }
    = props;
  const links = useRef<any>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const { balance, setCurrentBalance } = usePayment()
  const { currentUserId, email, setCurrentUserId } = useAuth();
  const [user, setUser] = useState<any>([])

  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  // const openDrawer = useCallback(() => {
  //   setIsSideDrawerOpen(true);
  // }, [setIsSideDrawerOpen]);

  // const closeDrawer = useCallback(() => {
  //   setIsSideDrawerOpen(false);
  // }, [setIsSideDrawerOpen]);


  const { data } = useQuery(['balance', currentUserId], async () => {

    if (!currentUserId) {

      const user = await getUser(email, 'login')
      setCurrentUserId(user)
      const balance = await getBalance(user)
      if (balance === undefined) {
        setCurrentBalance(0)
      }
      else {
        setCurrentBalance(balance!)
      }
    }
  }

  )


  useEffect(() => {

    if (currentUserId && data) {
      setCurrentBalance(data)
    }
    getUser(email, 'getCurrentUser').then((result) =>
      setUser(result))

  }, [data, email, currentUserId, balance, setCurrentBalance])

  const menuItems = [
    {
      link: "send-sms",
      name: "Messages",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <Message
            className={
              selectedTab === "Messages"
                ? classes.textPrimary
                : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <Message className="text-white" />,
      },
    },
    {
      link: "users",
      name: "Users",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <User
            className={
              selectedTab === "Users" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <User className="text-white" />,
      },
    },
    {
      link: "contacts",
      name: "Contact",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <Contact
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <Contact className="text-white" />,
      },
    },
    {
      link: "payment-history",
      name: "Payment History",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <Payment
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <Payment className="text-white" />,
      },
    },
    {
      link: "profile-info",
      name: "Profile Information ",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <HelpOutline
            className={
              selectedTab === "Profile Information " ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <HelpOutline className="text-white" />,
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
  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={openMobileDrawer}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Hidden xsDown>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="primary"
              >
                Lead
              </Typography>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="secondary"
              >
                Flows
              </Typography>
            </Hidden>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            {isWidthUp("sm", width) && (
              <Box mr={3}>
                <Balance
                  balance={balance}
                  openAddBalanceDialog={openAddBalanceDialog}
                />
              </Box>
            )}
            <NotificationPopperButton messages={messages} />
            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              <Avatar
                alt="profile picture"
                // src={`${process.env.PUBLIC_URL}/images/icons/user.jpg`}
                src={userIcon}
                className={classNames(classes.accountAvatar)}
              />
              {isWidthUp("sm", width) && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="textPrimary">{user?.email}</Typography>
                  }
                />
              )}
            </ListItem>
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <Drawer
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
                ref={(node) => {
                  links.current[index] = node;
                }}
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
                      if (element.name === 'Logout') {
                        localStorage.clear();
                        setCurrentUserId('');
                        setCurrentBalance(0);
                      }
                      links.current[index].click();
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
      </Hidden>
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
    </Fragment>
  );
}

export default withWidth()(withStyles(styles as {}, { withTheme: true })(NavBar));
