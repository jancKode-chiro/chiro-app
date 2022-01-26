import React, { Fragment, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
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
import MessageIcon from "@material-ui/icons/Message";
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
  const { classes, messages } = props;
  const anchorEl = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleClickAway = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // const id = isOpen ? "scroll-playground" : null;
  return (
    <Fragment>
      <IconButton
        onClick={handleClick}
        aria-describedby="id"
        aria-label="Open Messages"
        color="secondary"
        buttonRef={anchorEl}
      // onClick={handleClick}  
      // buttonRef={anchorEl}  
      // aria-label="Open Messages"
      // aria-describedby={id}
      >
        <MessageIcon />
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
            <Typography variant="subtitle1">Messages</Typography>
          </Box>
          <Divider className={classes.divider} />
        </AppBar>
        <List dense className={classes.tabContainer}>
          {messages?.length <= 0 ? (
            <ListItem>
              <ListItemText>
                You haven&apos;t received any messages yet.
              </ListItemText>
            </ListItem>
          ) : (
            messages?.map((element: any, index: number) => (
              <MessageListItem
                key={index}
                message={element}
                divider={index !== messages?.length - 1}
              />
            ))
          )}
        </List>
      </Popover>
    </Fragment>
  );
}


export default withStyles(styles as {}, { withTheme: true })(MessagePopperButton);
