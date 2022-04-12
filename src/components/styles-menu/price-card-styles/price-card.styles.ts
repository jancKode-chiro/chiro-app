export const styles = (theme: any) => ({
  card: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(2),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
  },
  cardHightlighted: {
    // paddingTop: theme.spacing(0),
    // paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 1,
    backgroundColor: theme.palette.primary.main,
    // [theme.breakpoints.down('xs')]: {
    //   marginTop: theme.spacing(2),
    // },
  },
  title: {
    color: theme.palette.primary.main,
  },
});
