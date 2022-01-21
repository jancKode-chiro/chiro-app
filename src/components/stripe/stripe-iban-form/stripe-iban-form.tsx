import React from "react";

import { TextField, Grid, InputAdornment } from "@material-ui/core";
import StripeTextField from "../stripe-text-field/stripe-text-field";
import { IbanElement } from "@stripe/react-stripe-js";

function StripeIBANForm(props: any) {
  const {
    stripeError,
    setStripeError,
    amount,
    amountError,
    onAmountChange,
    name,
    setName,
    email,
    setEmail
  } = props;
  return (
    <Grid container spacing={2} justify="space-between">
      <Grid item xs={8}>
        <TextField
          variant="outlined"
          margin="none"
          required
          label="Your Name"
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
          fullWidth
          autoFocus
          autoComplete="off"
          type="text"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          value={amount}
          onChange={event => {
            onAmountChange(parseInt(event.target.value));
          }}
          error={amountError ? true : false}
          helperText={amountError}
          variant="outlined"
          fullWidth
          type="number"
          margin="none"
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          variant="outlined"
          fullWidth
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
          type="email"
          margin="none"
          label="Email"
        />
      </Grid>
      <Grid item xs={12}>
        <StripeTextField
          margin="none"
          variant="outlined"
          fullWidth
          label="IBAN"
          error={stripeError ? true : false}
          helperText={stripeError}
          required
          StripeElement={IbanElement}
          stripeOptions={{ supportedCountries: ["SEPA"] }}
          onChange={() => {
            if (stripeError) {
              setStripeError("");
            }
          }}
        ></StripeTextField>
      </Grid>
    </Grid>
  );
}

export default StripeIBANForm;
