import React, { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";


import {
  Drawer,
  IconButton,
  Toolbar,
  Divider,
  Typography,
  Box,
  List,
  Tooltip,
  withStyles,
  ListItemIcon,
  ListItem
} from "@material-ui/core";

import { RiCloseCircleLine } from "react-icons/ri";
// import CloseIcon from "@material-ui/icons/Close";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Mail from "@material-ui/icons/Mail";
import Payment from "@material-ui/icons/Payment"
import Money from "@material-ui/icons/Money"

const drawerWidth = 240;


const styles = (theme: any) => ({
  toolbar: {
    minWidth: drawerWidth
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
})


function SideDrawer(props: any) {
  const {
    selectedTab,
    messages,
    classes,
    width,
    openAddBalanceDialog,
    onClose,
    open
  }
    = props;

  const links = useRef<any>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);



  const sideDrawerItems = [
    {
      link: "information",
      name: "Information Center",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <HelpOutline
            className={
              selectedTab === "Information Center" ? classes.textPrimary : "text-black"
            }
            fontSize="large"
          />
        ),
        mobile: <HelpOutline className="text-black" />,
      },
    },
    {
      link: "mail",
      name: "Mail Center",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <Mail
            className={
              selectedTab === "Mail Center" ? classes.textPrimary : "text-black"
            }
            fontSize="large"
          />
        ),
        mobile: <Mail className="text-black" />,
      },
    },
    {
      link: "payment-method",
      name: "Payment Method",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <Payment
            className={
              selectedTab === "PaymentMethod" ? classes.textPrimary : "text-black"
            }
            fontSize="large"
          />
        ),
        mobile: <Payment className="text-black" />,
      },
    },
    {
      link: "money",
      name: "Money Information",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <Money
            className={
              selectedTab === "Money Information" ? classes.textPrimary : "text-black"
            }
            fontSize="large"
          />
        ),
        mobile: <Money className="text-black" />,
      },
    },
  ]




  return (
    <Drawer anchor="right" open={open} variant="temporary" onClose={onClose}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Box
          pl={3}
          pr={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          {/* <Typography variant="h6">Information Section</Typography> */}
          <IconButton
            onClick={onClose}
            color="primary"
            aria-label="Close Sidedrawer"
          >
            <RiCloseCircleLine fontSize={35} />
          </IconButton>

        </Box>
      </Toolbar>
      <Divider />
      <List>
        {sideDrawerItems.map((element, index) => (
          <Link
            to={element.link}
            className={classes.menuLink}
            onClick={element.onClick}
            key={index}
            ref={(node: any) => {
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
                divider={index !== sideDrawerItems.length - 1}
                className={classes.permanentDrawerListItem}
                onClick={() => {
                  links.current[index].click();
                }}
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
  );
}

export default withStyles(styles)(SideDrawer);
