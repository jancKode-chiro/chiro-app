export const styles = (theme: any) => ({
  dialogPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(3),
    maxWidth: `100%`,
  },
  actions: {
    marginTop: theme.spacing(2),
  },
  dialogPaperScrollPaper: {
    maxHeight: 'none',
  },
  dialogContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});
