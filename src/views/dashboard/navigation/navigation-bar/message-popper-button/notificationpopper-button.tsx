import React, { Fragment, useState, useRef, useCallback } from "react";

import {
  Popover,
  IconButton,
  AppBar,
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  Box,
  withStyles,
} from "@material-ui/core";
import { BsBellFill } from "react-icons/bs";
import MessageListItem from "../message-list-item/messagelist-item";

const styles = (theme: any) => ({
  tabContainer: {
    overflowY: "auto",
    maxHeight: 350,
  },
  popoverPaper: {
    width: "100%",
    maxWidth: 350,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 270,
    },
  },
  divider: {
    marginTop: -2,
  },
  noShadow: {
    boxShadow: "none !important",
  },
});

function MessagePopperButton(props: any) {
  const { classes, notification } = props;
  const anchorEl = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleClickAway = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Fragment>
      <IconButton
        onClick={handleClick}
        aria-describedby="id"
        aria-label="Open Messages"
        color="secondary"
        buttonRef={anchorEl}
      >
        <BsBellFill />
      </IconButton>
      <Popover
        disableScrollLock
        open={isOpen}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{ paper: classes.popoverPaper }}
        onClose={handleClickAway}
      >
        <AppBar position="static" color="inherit" className={classes.noShadow}>
          <Box pt={1} pl={2} pb={1} pr={1}>
            <Typography variant="subtitle1">Notifications</Typography>
          </Box>
          <Divider className={classes.divider} />
        </AppBar>
        <List dense className={classes.tabContainer}>
          {notification?.length <= 0 ? (
            <ListItem>
              <ListItemText>
                You haven&apos;t received any notification yet.
              </ListItemText>
            </ListItem>
          ) : (
            notification?.map((element: any, index: number) => (
              <MessageListItem
                key={index}
                message={element}
                divider={index !== notification?.length - 1}
              />
            ))
          )}
        </List>
      </Popover>
    </Fragment>
  );
}


export default withStyles(styles as {}, { withTheme: true })(MessagePopperButton);
