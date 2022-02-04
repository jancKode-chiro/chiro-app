export const styles = (theme: any) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:enabled:hover': {
      color: theme.palette.primary.dark,
    },
    '&:enabled:focus': {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: 'auto',
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
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
});
