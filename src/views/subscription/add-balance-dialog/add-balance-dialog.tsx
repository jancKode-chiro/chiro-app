import React, { useState, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  IbanElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import { Grid, Button, Box, withTheme } from "@material-ui/core";
import StripeCardForm from '../stripe/stripe-card-form'
import StripeIbanForm from "../stripe/stripe-iban-form"
import FormDialog from "../../../components/common/forms/form-dialog/form-dialog";
import ColoredButton from "../../../components/common/colored-button/colored-button";
import HighlightedInformation from "../../../components/common/highlighted-information/highlighted-information";
import ButtonCircularProgress from "../../../components/common/button/button-circular-progress/button-circular-progress";
import { createPaymentIntent } from "../../../api/stripe";

const stripePromise = loadStripe("pk_test_51KTrLGFY8Bm4hnHxcxBtLDUKfoZSkOVYhk11rpPKMszokkTKTbbJnyvePpSjKwisx1i79cyQFwWoUOBnxBFqXdXS008D7YmkGp");

const paymentOptions = ["Credit Card", "SEPA Direct Debit"];

const AddBalanceDialog = withTheme(function (props: any) {
  // let promise = () => {
  //   const resolvePayment = new Promise((resolve, reject) => {
  //     setTimeout(resolve, 3000)
  //   });
  //   toast.promise(resolvePayment, {
  //     pending: "Payment is processing",
  //     success: "Payment is successful!",
  //     error: "Payment Failed"
  //   })
  // }
  // useEffect(() => {
  //   // toast.success("Payment Successful!"); 
  // }, [])
  const { open, theme, onClose, onSuccess } = props;
  const toastId = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState("Credit Card");
  const [stripeError, setStripeError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState("");
  const elements = useElements();
  const stripe = useStripe();



  const notify = () => toastId.current = toast("Processing your payment...", { type: toast.TYPE.INFO, autoClose: false });

  const update = () => toast.update(toastId.current, {
    render: `Payment successful. `, type: toast.TYPE.INFO, autoClose: 3000
  });

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
      onFormSubmit={async (event: any, stripeId: any) => {

        const myNewToastId = 'stripe';
        toast.update(stripeId, {
          render: "Payment Succesful",
          type: toast.TYPE.INFO,
          autoClose: 5000,
          toastId: myNewToastId
        });
        event.preventDefault();
        notify();
        if (amount <= 0) {
          setAmountError("Can't be zero");
          return;
        }
        if (stripeError) {
          setStripeError("");
        }
        setLoading(true);
        const result = await createPaymentIntent('/payment-intent', amount)

        const { error, paymentIntent }: any = await stripe?.confirmCardPayment(
          result?.data,
          {
            payment_method: {
              card: elements?.getElement(CardElement)!,
              billing_details: {
                name: name,
              },
            },
          }
        );
        if (error) {
          setStripeError(error.message);
          setLoading(false);
          return;
        }

        if (paymentIntent) {
          update()
        }
        onSuccess();
      }}
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
            {<ToastContainer />}
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
