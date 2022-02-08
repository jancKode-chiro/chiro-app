import React, { memo, useCallback, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  IconButton,
  withStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import BookIcon from "@material-ui/icons/Book";
import { Link } from "react-router-dom";

import { styles } from './nav-bar.styles'
import LoginDialog from '../../authenthication/login-dialog/login-dialog';
import NavigationDrawer from '../../../components/common/navigation-drawer/navigation-drawer';
import { LOGINDIALOG_PATH, CREATE_ACCOUNT_PATH } from '../../../constants/paths';

const NavBar = (props: any) => {
  const [isLoginDataDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState<{}>();


  const openLoginDataDialog = useCallback(() => {
    setIsLoginDialogOpen(true);
  }, [setIsLoginDialogOpen]);

  const closeLoginDialog = useCallback(() => {
    setIsLoginDialogOpen(false);
  }, [setIsLoginDialogOpen]);

  const onLoginSuccess = useCallback(() => {
    setPushMessageToSnackbar({
      text: "Your account has been logged in.",
    });
    setIsLoginDialogOpen(false);
  }, [setIsLoginDialogOpen]);

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );

  const {
    classes,
    openRegisterDialog,
    openLoginDialog,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab
  } = props;

  const navBarMenu = [
    {
      link: "/",
      name: "Home",
      onClick: undefined,
      icon: <HomeIcon className="text-white" />

    },
    {
      link: "/blog",
      name: "Blog",
      onClick: undefined,
      icon: <BookIcon className="text-white" />
    },
    {
      link: "/registerdialog",
      name: "Register",
      onClick: openRegisterDialog,
      icon: <HowToRegIcon className="text-white" />
    },
    {
      link: LOGINDIALOG_PATH,
      name: "Login",
      onClick: openLoginDialog,
      icon: <LockOpenIcon className="text-white" />
    }
  ];

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="primary"
            >
              Chiropractic
            </Typography>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="secondary"
            >
              Advertising
            </Typography>
          </div>
          <div>
            {/* <LoginDialog
              open={isLoginDataDialogOpen}
              onClose={closeLoginDialog}
              onSuccess={onLoginSuccess}
            /> */}
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
              >
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              {navBarMenu.map(element => {
                if (element.link) {
                  return (
                    <Link
                      key={element.name}
                      to={element.link}
                      className={classes.noDecoration}
                      onClick={handleMobileDrawerClose}
                    >
                      <Button
                        color="secondary"
                        size="large"
                        classes={{ text: classes.menuButtonText }}
                      >
                        {element.name}
                      </Button>
                    </Link>
                  );
                }
                return (
                  <Button
                    color="secondary"
                    size="large"
                    onClick={element.onClick}
                    classes={{ text: classes.menuButtonText }}
                    key={element.name}
                  >
                    {element.name}
                  </Button>
                );
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>

      {/* <NavigationDrawer
        menuItems={navBarMenu}
        selectedItem={selectedTab}
        anchor='right'
        onClose={handleMobileDrawerClose}
        open={mobileDrawerOpen}
        openLoginDataDialog={openLoginDataDialog}
      /> */}

    </div>
  )
}

export default withStyles(styles, { withTheme: true })(memo(NavBar)); 