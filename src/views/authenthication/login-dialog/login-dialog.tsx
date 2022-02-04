import React, { useState, useCallback, useRef, Fragment } from "react";

import classNames from "classnames";
import { useHistory } from 'react-router-dom';
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
  DialogActions,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Auth } from 'aws-amplify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DASHBOARD_PATH, FORGOTPASSWORD_DIALOG_PATH, PASSWORDFORGOT_PATH } from '../../../constants/paths';
import { useAuth } from '../../../context/auth-context';
import { toast } from 'react-toastify';
import { getUser } from '../../../api/users';
import { getCurrentSession } from '../../../helpers/user-helpers';
import { styles } from './login-dialog.styles';
import { StyledLink } from "../../../components/link/link";
import ColoredButton from "../../../components/common/colored-button/colored-button";
import FormDialog from "../../../components/common/form-dialog/form-dialog";
import ButtonCircularProgress from "../../../components/common/button/button-circular-progress/button-circular-progress";
import VisibilityPasswordTextField from "../../../components/common/visibility-password-textfield/visibility-password-textfield";
import theme from "../../../styles/theme";

type InputProps = {
  email: string;
  password: string;
};

function LoginDialog(props: any) {
  const {
    setStatus,
    classes,
    onClose,
    openChangePasswordDialog,
    status,
  } = props;
  const {

    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef();
  const loginPassword = useRef();

  const history = useHistory();
  const { setAuthState, setInputEmail, setCurrentUserId } =
    useAuth();
  // const { goTo } = useNav();
  // const backToHome = (): void => history.push(LOGIN_PATH);

  const submitHandler: SubmitHandler<InputProps> = async (
    data
  ): Promise<void> => {

    setInputEmail(data.email);
    setCurrentUserId(await getUser(data.email));

    Auth.signIn(data.email, data.password)
      .then(async () => {
        const session = await getCurrentSession();

        await setAuthState(session);
        history.push(DASHBOARD_PATH);
        toast.success('Welcome back')

      })
      .catch((err) => {
        toast.error(err.message)
      });

  };


  // const login = useCallback(() => {
  //   setIsLoading(true);
  //   setStatus(null);
  //   if (loginEmail.current.value !== "test@web.com") {
  //     setTimeout(() => {
  //       setStatus("invalidEmail");
  //       setIsLoading(false);
  //     }, 1500);
  //   } else if (loginPassword.current.value !== "HaRzwc") {
  //     setTimeout(() => {
  //       setStatus("invalidPassword");
  //       setIsLoading(false);
  //     }, 1500);
  //   } else {
  //     setTimeout(() => {
  //       history.push("/c/dashboard");
  //     }, 150);
  //   }
  // }, [setIsLoading, loginEmail, loginPassword, history, setStatus]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormDialog
          open
          onClose={onClose}
          loading={isLoading}
          // onFormSubmit={(e: { preventDefault: () => void; }) => {
          //   e.preventDefault();
          //   login();
          // }}
          hideBackdrop
          headline="Login"
          content={
            <Fragment>
              <TextField
                defaultValue='gynnanne@gmail.com'
                variant="outlined"
                margin="normal"
                error={status === "invalidEmail"}
                required
                fullWidth
                label="Email Address"
                inputRef={loginEmail}
                autoFocus
                autoComplete="off"
                type="email"
                onChange={() => {
                  if (status === "invalidEmail") {
                    setStatus(null);
                  }
                }}
                helperText={
                  status === "invalidEmail" &&
                  "This email address isn't associated with an account."
                }
                FormHelperTextProps={{ error: true }}
              />
              <VisibilityPasswordTextField
                defaultValue='Chir_1234.'
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={status === "invalidPassword"}
                label="Password"
                inputRef={loginPassword}
                autoComplete="off"
                onChange={() => {
                  if (status === "invalidPassword") {
                    setStatus(null);
                  }
                }}
                helperText={
                  status === "invalidPassword" ? (
                    <span>
                      Incorrect password. Try again, or click on{" "}
                      <b>&quot;Forgot Password?&quot;</b> to reset it.
                    </span>
                  ) : (
                    ""
                  )
                }
                FormHelperTextProps={{ error: true }}
                onVisibilityChange={setIsPasswordVisible}
                isVisible={isPasswordVisible}
              />
              <FormControlLabel
                className={classes.formControlLabel}
                control={<Checkbox color="primary" />}
                label={<Typography variant="body1">Remember me</Typography>}
              />
              {/* {status === "verificationEmailSend" ? (
              <HighlightedInformation>
                We have send instructions on how to reset your password to your
                email address
              </HighlightedInformation>
            ) : (
              <HighlightedInformation>
                Email is: <b>test@web.com</b>
                <br />
                Password is: <b>HaRzwc</b>
              </HighlightedInformation>
            )} */}
            </Fragment>
          }
          actions={
            <Fragment>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disabled={isLoading}
                size="large"
              >
                Login
                {isLoading && <ButtonCircularProgress />}
              </Button>
              {/* <Typography
                align="center"
                className={classNames(
                  classes.forgotPassword,
                  isLoading ? classes.disabledText : null
                )}
                color="primary"
                onClick={isLoading ? null : openChangePasswordDialog}
                tabIndex={0}
                role="button"
                onKeyDown={(event) => {
                  // For screenreaders listen to space and enter events
                  if (
                    (!isLoading && event.keyCode === 13) ||
                    event.keyCode === 32
                  ) {
                    openChangePasswordDialog();
                  }
                }}
              > */}
              <StyledLink
                className={classNames(
                  classes.forgotPassword,
                  isLoading ? classes.disabledText : null
                )} to={PASSWORDFORGOT_PATH}>
                <Typography align="center">
                  Forgot Password
                </Typography>

              </StyledLink>

              <StyledLink to="/">
                <DialogActions className={classes.dialogActions}>
                  <ColoredButton
                    onClick={onClose}
                    variant="contained"
                    color={theme.palette.common.black}
                  >
                    <ArrowBackIcon path="/" className={classes.backIcon} />
                    Back
                  </ColoredButton>
                </DialogActions>
              </StyledLink>

            </Fragment>

          }
        />
      </form>

    </Fragment>
  );
}
export default withStyles(styles, { withTheme: true })(LoginDialog);          
