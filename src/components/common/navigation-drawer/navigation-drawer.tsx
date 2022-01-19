import React, { useEffect } from 'react'
import {
  isWidthUp,
  ListItemText,
  Drawer,
  withStyles,
  IconButton,
  Typography,
  withWidth,
} from '@material-ui/core';
import { DrawerLink, DrawerList, DrawerListItem, DrawerListItemIcon, DrawerToolbar } from './navigation-drawer.styles';
import CloseIcon from "@material-ui/icons/Close";

type NavigationDrawProps = {
  anchor: "left" | "top" | "right" | "bottom" | undefined;
  theme?: any;
  width?: any;
  selectedItem: any;
  open: any;
  onClose: () => void;
  menuItems: any
  // menuItems: [{
  //   link?: string,
  //   name: string,
  //   onClick?: any
  //   icon: any
  // }];
}

const styles = (theme: any) => ({})

const NavigationDrawer = ({ anchor, menuItems, selectedItem, open, onClose, width }: NavigationDrawProps) => {

  useEffect(() => {
    window.onresize = () => {
      if (isWidthUp("sm", width) && open) {
        onClose();
      }
    };
  }, [width, open, onClose]);


  return (
    <Drawer
      variant='temporary'
      anchor={anchor}
      open={open}
      onClose={onClose}
    >
      <DrawerToolbar>
        <DrawerListItem button disableGutters anchor={anchor}>
          <DrawerListItemIcon>
            <IconButton onClick={onClose} aria-label="Close Navigation">
              <CloseIcon color='primary' />
            </IconButton>
          </DrawerListItemIcon>
        </DrawerListItem>
      </DrawerToolbar>
      <DrawerList>
        {menuItems.map((element: any) => {

          if (element.link) {
            console.log('element.link', element.link)
            return (
              <DrawerLink
                key={element.name}
                to={element.link}
                onClick={onClose}
              >
                <DrawerListItem button
                  selected={selectedItem === element.name}
                  disableRipple
                  disableTouchRipple
                >
                  <DrawerListItemIcon>{element.icon}</DrawerListItemIcon>
                  <ListItemText
                    primary={
                      <Typography >
                        {element.name}
                      </Typography>
                    }
                  />
                </DrawerListItem>
              </DrawerLink>
            )
          }
          return (
            <DrawerListItem
              button
              key={element.name}
              onClick={element.onClick}
            >
              <DrawerListItemIcon>
                {element.icon}
              </DrawerListItemIcon>
              <ListItemText
                primary={
                  <Typography variant='subtitle1' className='text-white' >
                    {element.name}
                  </Typography>
                }
              />
            </DrawerListItem>
          )
        })}
      </DrawerList>
    </Drawer>
  )
}

export default withWidth()(withStyles(styles, { withTheme: true })(NavigationDrawer));

