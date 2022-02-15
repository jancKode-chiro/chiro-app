import React from "react";
import { Chip } from "@material-ui/core";
import shadeColor from "../shade-color/shade-color";

function ColorfulChip(props: any) {
  const { color, label, className } = props;
  return (
    <Chip
      style={{
        color: color,
        backgroundColor: shadeColor(color, 0.7)
      }}
      label={label}
      className={className ? className : null}
    />
  );
}

export default ColorfulChip;
