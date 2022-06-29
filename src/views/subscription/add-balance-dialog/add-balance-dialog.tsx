import { useState, Fragment, useRef, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
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
import { useAuth } from "../../../context/auth-context";
import { addBalance } from '../../../api/payments'
import { usePayment } from "../../../context/payment-context";
import { STRIPE_KEY } from "../../../constants/constants";


const stripePromise = loadStripe(STRIPE_KEY!);

const paymentOptions = ["Credit Card", "SEPA Direct Debit"];

const AddBalanceDialog = withTheme(function (props: any) {

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
  const { currentUserId } = useAuth();
  const { setCurrentBalance } = usePayment()

  const notify = () => toastId.current = toast("Processing your payment...", { type: toast.TYPE.INFO, autoClose: false });

  const update = (message: string) => toast.update(toastId.current, {
    render: message, type: toast.TYPE.INFO, autoClose: 3000
  });


  const balanceUpdated = () => toast("Balance has been updated");

  const onAmountChange = (amount: number) => {
    if (amount < 0) {
      return;
    }
    if (amountError) {
      setAmountError("");
    }
    setAmount(amount);
  };

  useEffect(() => {
    console.log('STRIPE_KEY', STRIPE_KEY)
  }, [])

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
          update(`Amount can't be zero. `)
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
          update('Payment failed, please try again.')
          return;
        }

        if (paymentIntent) {
          const newBalance: any = await addBalance(currentUserId, amount)
          await update('Payment successful, updating your balance...')
          await balanceUpdated()
          setCurrentBalance(newBalance)
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
