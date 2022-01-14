import React from 'react'
import {
  List,
  ListItemText,
  Drawer,
  withStyles,
  IconButton,
  Typography,
  withWidth,
  isWidthUp,
  Toolbar,
  ListItemProps,
  ListProps,
  IconProps
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

const NavigationDrawer = ({ anchor, menuItems, theme, selectedItem, open, onClose, width }: NavigationDrawProps) => {
  return (
    <Drawer variant='temporary' anchor={anchor}
    >
      <DrawerToolbar>
        <DrawerListItem button>
          <DrawerListItemIcon>
            <IconButton>
              <CloseIcon color='primary' />
            </IconButton>
          </DrawerListItemIcon>
        </DrawerListItem>
      </DrawerToolbar>
      <DrawerList>
        {menuItems.map((element: any) => {
          if (element.link) {
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
                <ListItemText
                  primary={
                    <Typography >
                      {element.name}
                    </Typography>
                  }
                />
              </DrawerListItemIcon>
            </DrawerListItem>
          )
        })}
      </DrawerList>
    </Drawer>
  )
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(NavigationDrawer)
);

