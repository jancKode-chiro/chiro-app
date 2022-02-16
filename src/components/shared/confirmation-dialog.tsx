import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import ButtonCircularProgress from "./buttoncircular-progress";

function ConfirmationDialog(props: any) {
  const { open, onClose, loading, title, content, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button
          color="secondary"
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
        >
          Yes {loading && <ButtonCircularProgress />}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ConfirmationDialog;
