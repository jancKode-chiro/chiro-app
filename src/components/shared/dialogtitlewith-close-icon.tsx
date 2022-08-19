import React from "react";

import {
  IconButton,
  Typography,
  Box,
  withTheme
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function DialogTitleWithCloseIcon(props: any) {
  const {
    onClose,
    disabled,
    title,
  } = props;
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h5">{title}</Typography>
      <IconButton
        onClick={onClose}
        style={{ marginRight: -12, marginTop: -10 }}
        disabled={disabled}
        aria-label="Close"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
export default withTheme(DialogTitleWithCloseIcon);
