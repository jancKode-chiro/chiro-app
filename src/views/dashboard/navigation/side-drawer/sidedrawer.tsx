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

import HelpOutline from "@material-ui/icons/HelpOutline";
import Payment from "@material-ui/icons/Payment"
import Card from "@material-ui/icons/CardMembershipOutlined"

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
      link: "profile-info",
      name: "Profile Information ",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <HelpOutline
            className={
              selectedTab === "Profile Information " ? classes.textPrimary : "text-black"
            }
            fontSize="large"
          />
        ),
        mobile: <HelpOutline className="text-black" />,
      },
    },
    {
      link: "wallet",
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
      link: "card",
      name: "Card",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <Card
            className={
              selectedTab === "Card" ? classes.textPrimary : "text-black"
            }
            fontSize="large"
          />
        ),
        mobile: <Card className="text-black" />,
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
