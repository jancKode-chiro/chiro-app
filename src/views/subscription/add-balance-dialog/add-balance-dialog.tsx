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
import FormDialog from "../../../components/common/forms/form-dialog/form-dialog";
import PricingSection from "../../home/pricing-section/pricing-section";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const paymentOptions = ["Credit Card", "SEPA Direct Debit"];


const AddBalanceDialog = withTheme(function (props: any) {
  const { open, theme, onClose, onSuccess } = props;

  const [selectedValue, setSelectedValue] = useState(null);
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


  const handlerChange = ({ onChange, item, event }: any) => {
    setSelectedValue(event.target.value)
    onChange(item.value)
  }


  return (
    <FormDialog
      open={open}
      onClose={onClose}
      headline="Add Balance"
      hideBackdrop={false}
      loading={loading}
      onFormSubmit={async (event: any) => {
        event.preventDefault();
        if (amount <= 0) {
          setAmountError("Can't be zero");
          return;
        }
        if (stripeError) {
          setStripeError("");
        }
        setLoading(true);
        const { error }: any = await stripe?.createPaymentMethod(
          getStripePaymentInfo()
        );
        if (error) {
          setStripeError(error.message);
          setLoading(false);
          return;
        }
        onSuccess();
      }}
      content={
        <Grid container spacing={1}>
          <PricingSection onClick={handlerChange} />
        </Grid>
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
