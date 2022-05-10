import React, { Fragment, useState, useCallback } from "react";
import { styles } from "./zoom-image.styles";
import { Portal, Backdrop, withStyles } from "@material-ui/core";
import ScrollbarSize from "@material-ui/core/Tabs/index";
import classNames from "classnames";

const ZoomImage = (props: any) => {
  const { alt, src, zoomedImgProps, classes, className, ...rest } = props;
  const [zoomedIn, setZoomedIn] = useState(false);
  const [scrollbarSize, setScrollbarSize] = useState<any>('');

  const zoomIn = useCallback(() => {
    setZoomedIn(true);
  }, [setZoomedIn]);

  const zoomOut = useCallback(() => {
    setZoomedIn(false);
  }, [setZoomedIn]);


  return (
    <Fragment>
      <ScrollbarSize onChange={setScrollbarSize} ></ScrollbarSize>
      {zoomedIn && (
        <Portal>
          <Backdrop
            open={zoomedIn}
            className={classes.backdrop}
            onClick={zoomOut}
          ></Backdrop>
          <div onClick={zoomOut} className={classes.portalImgWrapper}>
            <div className={classes.portalImgInnerWrapper}>
              <img
                alt={alt}
                src={src}
                className={classes.portalImg}
                {...zoomedImgProps}
              ></img>
            </div>
          </div>
        </Portal>
      )}
      <img
        alt={alt}
        src={src}
        onClick={zoomIn}
        className={classNames(className, classes.zoomedOutImage)}
        {...rest}
      ></img>
    </Fragment>
  );
}
export default withStyles(styles as {}, { withTheme: true })(ZoomImage);