import React from "react";
import { TextField, withTheme } from "@material-ui/core";

function MyInputComponent(props: any) {
  const { component: Component, inputRef, ...other } = props;

  React.useImperativeHandle(inputRef, () => ({
    focus: () => {

    }

  }));

  return <Component {...other} />;
}

function StripeTextField(props: any) {
  const { stripeOptions, StripeElement, select, theme, ...rest } = props;
  const options = {
    style: {
      base: {
        ...theme.typography.body1,
        color: theme.palette.text.primary,
        fontSize: "16px",
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: theme.palette.text.secondary
        }
      },
      invalid: {
        iconColor: theme.palette.error.main,
        color: theme.palette.error.main
      }
    },
    ...stripeOptions
  };
  return (
    <TextField
      InputLabelProps={{
        shrink: true
      }}
      inputProps={{ component: StripeElement, options: options }}
      InputProps={{
        inputComponent: MyInputComponent
      }}
      {...rest}
    />
  );
}

export default withTheme(StripeTextField);
