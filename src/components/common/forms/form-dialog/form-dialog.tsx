import React from "react";
import { Dialog, DialogContent, Box, withStyles } from "@material-ui/core";
import { styles } from "../../../styles-menu/form-dialog-styles/form-dialog.styles";
import DialogTitleWithCloseIcon from "../../dialog/dialog-title-with-icon/dialog-title-with-icon";

function FormDialog(props: any) {
  const {
    classes,
    open,
    onClose,
    loading,
    headline,
    onFormSubmit,
    content,
    actions,
    hideBackdrop
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
      classes={{
        paper: classes.dialogPaper,
        paperScrollPaper: classes.dialogPaperScrollPaper
      }}
      hideBackdrop={hideBackdrop ? hideBackdrop : false}
    >
      <DialogTitleWithCloseIcon
        title={headline}
        onClose={onClose}
        disabled={loading}
      />
      <DialogContent className={classes.dialogContent}>
        <form onSubmit={onFormSubmit}>
          <div>{content}</div>
          <Box width="100%" className={classes.actions}>
            {actions}
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles as {}, { withTheme: true })(FormDialog);
