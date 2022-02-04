export const styles = (theme: any) => ({
  link: {
    fontsize: '36px',
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:enabled:hover': {
      color: theme.palette.primary.dark,
    },
    '&:enabled:focus': {
      color: theme.palette.primary.dark,
    },
    backIcon: {
      marginRight: theme.spacing(1),
    },
    dialogActions: {
      justifyContent: 'flex-start',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
});
