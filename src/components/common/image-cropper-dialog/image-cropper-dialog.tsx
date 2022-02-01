import React, { useState, useCallback } from "react";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  withStyles,
} from "@material-ui/core";

const styles = (theme: any) => ({
  dialogPaper: { maxWidth: `${theme.breakpoints.values.md}px !important` },
  dialogContent: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
});

function ImageCropperDialog(props: any) {
  const {
    ImageCropper,
    classes,
    onClose,
    open,
    src,
    onCrop,
    aspectRatio,
    theme,
  } = props;
  const [crop, setCrop] = useState(null);

  const getCropFunctionFromChild = useCallback(
    (cropFunction) => {
      setCrop(() => cropFunction);
    },
    [setCrop]
  );

  return (
    <Dialog
      open={open}
      onEscapeKeyDown={onClose}
      classes={{ paper: classes.dialogPaper }}
      style={{ overflowX: "visible" }}
    >
      <DialogContent className={classes.dialogContent}>
        <ImageCropper
          src={src}
          setCropFunction={getCropFunctionFromChild}
          onCrop={onCrop}
          aspectRatio={aspectRatio}
          color={theme.palette.primary.main}
        />
      </DialogContent>
      <DialogActions>
        <Box mr={1}>
          <Button onClick={onClose}>Close</Button>
        </Box>
        {/* <Button variant="contained" color="secondary" onClick={crop}>
          Crop
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
export default withStyles(styles, { withTheme: true })(ImageCropperDialog);
