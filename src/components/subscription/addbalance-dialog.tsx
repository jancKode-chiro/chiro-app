import React, { useState, Fragment } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  IbanElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Grid, Button, Box, withTheme } from "@material-ui/core";
import StripeCardForm from "../stripe/stripe-card-form/stripe-card-form";
import StripeIbanForm from "../stripe/stripe-iban-form/stripe-iban-form";
import FormDialog from "../shared/formdialog";
import ColoredButton from "../shared/colored-button";
import HighlightedInformation from "../shared/Highlighted-information";
import ButtonCircularProgress from "../shared/buttoncircular-progress";
// import { AnyObjectSchema } from "yup";

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

  const onAmountChange = (amount: any) => {
    if (amount < 0) {
      return;
    }
    if (amountError) {
      setAmountError("");
    }
    setAmount(amount);
  };

  const getStripePaymentInfo = (elements: any) => {
    switch (paymentOption) {
      case "Credit Card": {
        return {
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: { name: name }
        };
      }
      case "SEPA Direct Debit": {
        return {
          type: "sepa_debit",
          sepa_debit: elements.getElement(IbanElement),
          billing_details: { email: email, name: name }
        };
      }
      default:
        throw new Error("No case selected in switch statement");
    }
  };

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
      // onFormSubmit={async event => {
      //   event.preventDefault();
      //   if (amount <= 0) {
      //     setAmountError("Can't be zero");
      //     return;
      //   }
      //   if (stripeError) {
      //     setStripeError("");
      //   }
      //   setLoading(true);
      //   const { error } = await stripe.createPaymentMethod(
      //     getStripePaymentInfo()
      //   );
      //   if (error) {
      //     setStripeError(error.message);
      //     setLoading(false);
      //     return;
      //   }
      //   onSuccess();
      // }}
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
