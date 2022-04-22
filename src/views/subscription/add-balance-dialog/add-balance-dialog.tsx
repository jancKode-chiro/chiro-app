import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  IbanElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Grid, Button, Box, withTheme } from "@material-ui/core";
import { createPaymentIntent } from "../../../api/stripe";
import StripeCardForm from '../stripe/stripe-card-form'
import StripeIbanForm from "../stripe/stripe-iban-form"
import FormDialog from "../../../components/common/forms/form-dialog/form-dialog";
import ColoredButton from "../../../components/common/colored-button/colored-button";
import HighlightedInformation from "../../../components/common/highlighted-information/highlighted-information";
import ButtonCircularProgress from "../../../components/common/button/button-circular-progress/button-circular-progress";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const paymentOptions = ["Credit Card", "SEPA Direct Debit"];

const AddBalanceDialog = withTheme(function (props: any) {
  const { open, theme, onClose, onSuccess } = props;

  const [loading, setLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState("Credit Card");
  const [stripeError, setStripeError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState("");
  const elements = useElements();
  const stripe = useStripe();

  const onAmountChange = (amount: number) => {
    if (amount < 0) {
      return;
    }
    if (amountError) {
      setAmountError("");
    }
    setAmount(amount);
  };

  const getStripePaymentInfo = () => {
    switch (paymentOption) {
      case "Credit Card": {
        return {
          type: "card",
          card: elements?.getElement(CardElement),
          billing_details: { name: name },
          customer_balance: {}
        };
      }
      case "SEPA Direct Debit": {
        return {
          type: "sepa_debit",
          sepa_debit: elements?.getElement(IbanElement),
          billing_details: { email: email, name: name },
          customer_balance: {}
        };
      }
      default:
        throw new Error("No case selected in switch statement");
    }
  };

  const clientSecret = "pi_3Kqwp9FY8Bm4hnHx1vyqIMvQ_secret_wJgzN64PUKw3HBxDfudyra9Ne"

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (amount <= 0) {
      setAmountError("Can't be Zero");
      return;
    }
    if (stripeError) {
      setStripeError("");
    }
    setLoading(true);

    if (!stripe || !elements) {
      return
    }

    const result = await createPaymentIntent('payment-intent', amount)

    console.log('clientSecret', result)
    onSuccess();

    const { paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: "pk_test_6pRNASCoBOKtIshFeQd4XMUh"
      }
    )
    onSuccess(paymentIntent);
  }

  const renderPaymentComponent = () => {
    switch (paymentOption) {
      case "Credit Card":
        return (
          <Fragment>
            <Box mb={2}>
              <StripeCardForm
                stripeError={stripeError}
                setStripeError={setStripeError}
                setName={setName}
                name={name}
                amount={amount}
                amountError={amountError}
                onAmountChange={onAmountChange}
              />
            </Box>
            <HighlightedInformation>
              You can check this integration using the credit card number{" "}
              <b>4242 4242 4242 4242 04 / 24 24 242 42424</b>
            </HighlightedInformation>
          </Fragment>
        );
      case "SEPA Direct Debit":
        return (
          <Fragment>
            <Box mb={2}>
              <StripeIbanForm
                stripeError={stripeError}
                setStripeError={setStripeError}
                setName={setName}
                setEmail={setEmail}
                name={name}
                email={email}
                amount={amount}
                amountError={amountError}
                onAmountChange={onAmountChange}
              />
            </Box>
            <HighlightedInformation>
              You can check this integration using the IBAN
              <br />
              <b>DE89370400440532013000</b>
            </HighlightedInformation>
          </Fragment>
        );
      default:
        throw new Error("No case selected in switch statement");
    }
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      headline="Add Balance"
      hideBackdrop={false}
      loading={loading}
      onFormSubmit={handleSubmit}
      content={
        <Box pb={2}>
          <Box mb={2}>
            <Grid container spacing={1}>
              {paymentOptions.map(option => (
                <Grid item key={option}>
                  <ColoredButton
                    variant={
                      option === paymentOption ? "contained" : "outlined"
                    }
                    disableElevation
                    onClick={() => {
                      setStripeError("");
                      setPaymentOption(option);
                    }}
                    color={theme.palette.common.black}
                  >
                    {option}
                  </ColoredButton>
                </Grid>
              ))}
            </Grid>
          </Box>
          {renderPaymentComponent()}
        </Box>
      }
      actions={
        <Fragment>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            type="submit"
            size="large"
            disabled={loading}
          >
            Pay with Stripe {loading && <ButtonCircularProgress />}
          </Button>
        </Fragment>
      }
    />
  );
});

function Wrapper(props: any) {
  const { open, onClose, onSuccess } = props;
  return (
    <Elements stripe={stripePromise}>
      {open && (
        <AddBalanceDialog open={open} onClose={onClose} onSuccess={onSuccess} />
      )}
    </Elements>
  );
}

export default Wrapper;
