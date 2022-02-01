import React, { useState, useRef, useCallback } from "react";

import format from "date-fns/format";
import { GridListTileBar, withStyles } from "@material-ui/core";
import VertOptions from "../vert-options/vert-options";

const styles = {
  imageContainer: {
    width: "100%",
    paddingTop: "100%",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
};

function SelfAligningImage(props: any) {
  const {
    classes,
    src,
    title,
    timeStamp,
    options,
    roundedBorder,
    theme,
  } = props;
  const img = useRef();
  const [hasMoreWidthThanHeight, setHasMoreWidthThanHeight] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // const onLoad = useCallback(() => {
  //   if (img.current.naturalHeight < img.current.naturalWidth) {
  //     setHasMoreWidthThanHeight(true);
  //   } else {
  //     setHasMoreWidthThanHeight(false);
  //   }
  //   setHasLoaded(true);
  // }, [img, setHasLoaded, setHasMoreWidthThanHeight]);

  return (
    <div className={classes.imageContainer}>
      <img
        style={{
          height: hasMoreWidthThanHeight ? "100%" : "auto",
          width: hasMoreWidthThanHeight ? "auto" : "100%",
          display: hasLoaded ? "block" : "none",
          borderRadius: roundedBorder ? theme.shape.borderRadius : 0,
        }}
        // ref={img}
        className={classes.image}
        // onLoad={onLoad}
        src={src}
        alt=""
      />
      {title && (
        <GridListTileBar
          title={title}
          subtitle={format(new Date(timeStamp * 1000), "PP - k:mm", {
            // awareOfUnicodeTokens: true,
          })}
          actionIcon={
            options.length > 0 && (
              <VertOptions color={theme.palette.common.white} items={options} />
            )
          }
        />
      )}
    </div>
  );
}
export default withStyles(styles as {}, { withTheme: true })(SelfAligningImage);
