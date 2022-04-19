import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid, InputAdornment } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import StripeTextField from "./stripe-text-field";


function StripeCardForm(props: any) {
  const elements = useElements()
  const stripe = useStripe();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { clientSecret } = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodType: 'card',
        currency: 'USD',
      }),
    }).then(r => r.json());
    stripe.confirmCardPayment(
      clientSecret, {
      payment_method: 'pi_3KpsP2FY8Bm4hnHx1y0sPL3s'
    }
    )
  }

  const {
    stripeError,
    setStripeError,
    amount,
    amountError,
    onAmountChange,
    name,
    setName
  } = props;
  return (
    <div onSubmit={handleSubmit}>
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
          <StripeTextField
            margin="none"
            fullWidth
            label="Credit Card"
            error={stripeError ? true : false}
            helperText={stripeError}
            variant="outlined"
            required
            StripeElement={CardElement}
            onChange={() => {
              if (stripeError) {
                setStripeError("");
              }
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default StripeCardForm;
