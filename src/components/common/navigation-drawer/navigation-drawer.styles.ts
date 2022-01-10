import { styled } from '@material-ui/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  ListItemProps,
  ListProps,
} from '@material-ui/core';
import { Link, LinkProps } from 'react-router-dom';

export const DrawerToolbar = styled(Toolbar)({
  width: 200,
});

export const DrawerListItem = styled(ListItem)<ListItemProps>({
  paddingTop: 0,
  paddingBottom: 0,
  height: '100%',
  justifyContent: (props: any) =>
    props.anchor === 'left' ? 'flex-start' : 'flex-end',
});

export const DrawerListItemIcon = styled(ListItemIcon)<ListItemProps>({
  marginRight: 0.5,
});

export const DrawerList = styled(List)<ListProps>({
  backgroundColor: 'black',
  height: '100%',
});

export const DrawerLink = styled(Link)<LinkProps>({
  textDecoration: 'none !important',
});
