import React, { useState, useCallback, useRef, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import {
  FormHelperText,
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
} from "@material-ui/core";
import { createUser } from '../../../api/users';
import { useAuth } from '../../../context/auth-context';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ACTIVATE_ACCOUNT_PATH, TERMS_SERVICE_PATH } from '../../../constants/paths';
import { styles } from "./register-dialog.styles";
import { StyledLink } from "../../../components/link/link";
import FormDialog from "../../../components/common/forms/form-dialog/form-dialog";
import HighlightedInformation from "../../../components/common/highlighted-information/highlighted-information";
import ButtonCircularProgress from "../../../components/common/button/button-circular-progress/button-circular-progress";
import VisibilityPasswordTextField from "../../../components/common/visibility-password-textfield/visibility-password-textfield";


type InputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
};

function RegisterDialog(props: any) {
  const { setStatus, theme, onClose, openTermsDialog, status, classes } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const registerTermsCheckbox = useRef();
  const registerPassword = useRef();
  const registerPasswordRepeat = useRef();

  const {
    register,
    handleSubmit,
  } = useForm();

  const history = useHistory();
  const { setAuthState, setInputEmail, setCurrentUserId } =
    useAuth();

  const submitHandler: SubmitHandler<InputProps> = async (
    data
  ): Promise<void> => {

    setInputEmail(data.email);

    try {
      let result = await createUser(
        data.firstName,
        data.lastName,
        data.email,
        data.phoneNumber,
        'User',
        data.password,
        data.country,
        data.countryCode
      );

      if (result)
        await history.push({
          pathname: ACTIVATE_ACCOUNT_PATH,
          state: 'signUp',
        });
    } catch (error: any) {
      toast.error(error)
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormDialog
        loading={isLoading}
        onClose={onClose}
        open
        headline="Register"
        hideBackdrop
        hasCloseIcon
        content={
          <Fragment>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidFirstName"}
              label="First Name"
              autoFocus
              autoComplete="off"
              type="name"
              {...register('firstName', { required: 'First name is Required' })}
              FormHelperTextProps={{ error: true }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidLastName"}
              label="Last Name"
              autoFocus
              autoComplete="off"
              type="name"
              {...register('lastName', { required: 'Last name is Required' })}
              FormHelperTextProps={{ error: true }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidEmail"}
              label="Email Address"
              autoFocus
              autoComplete="off"
              type="email"
              {...register('emailAddress', { required: 'Email address is Required' })}
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={
                status === "passwordTooShort" || status === "passwordsDontMatch"
              }
              label="Password"
              inputRef={registerPassword}
              autoComplete="off"
              onChange={() => {
                if (
                  status === "passwordTooShort" ||
                  status === "passwordsDontMatch"
                ) {
                  setStatus(null);
                }
              }}
              helperText={(() => {
                if (status === "passwordTooShort") {
                  return "Create a password at least 6 characters long.";
                }
                if (status === "passwordsDontMatch") {
                  return "Your passwords dont match.";
                }
                return null;
              })()}
              FormHelperTextProps={{ error: true }}
              isVisible={isPasswordVisible}
              onVisibilityChange={setIsPasswordVisible}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={
                status === "passwordTooShort" || status === "passwordsDontMatch"
              }
              label="Repeat Password"
              inputRef={registerPasswordRepeat}
              autoComplete="off"
              onChange={() => {
                if (
                  status === "passwordTooShort" ||
                  status === "passwordsDontMatch"
                ) {
                  setStatus(null);
                }
              }}
              helperText={(() => {
                if (status === "passwordTooShort") {
                  return "Create a password at least 6 characters long.";
                }
                if (status === "passwordsDontMatch") {
                  return "Your passwords dont match.";
                }
              })()}
              FormHelperTextProps={{ error: true }}
              isVisible={isPasswordVisible}
              onVisibilityChange={setIsPasswordVisible}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidPhoneNumber"}
              label="Phone Number"
              autoFocus
              autoComplete="off"
              type="number"
              {...register('phoneNumber', { required: 'Phone number is Required' })}
              FormHelperTextProps={{ error: true }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidCountry"}
              label="Country"
              autoFocus
              autoComplete="off"
              type="country"
              {...register('country', { required: 'Country is Required' })}
              FormHelperTextProps={{ error: true }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidCountryCode"}
              label="Country Code"
              autoFocus
              autoComplete="off"
              type="code"
              {...register('countryCode', {
                required: 'Country code is required',
              })}
              FormHelperTextProps={{ error: true }}

            />
            <FormControlLabel
              style={{ marginRight: 0 }}
              control={
                <Checkbox
                  color="primary"
                  // inputRef={registerTermsCheckbox}
                  onChange={() => {
                    setHasTermsOfServiceError(false);
                  }}
                />
              }
              label={
                <Typography variant="body1">
                  I agree to the
                </Typography>
              }
            />
            <StyledLink
              onClick={isLoading ? null : openTermsDialog}
              className={classes.link}
              to={TERMS_SERVICE_PATH}
            >
              <span
                className={classes.link}
                onClick={isLoading ? null : openTermsDialog}
                tabIndex={0}
                role="button"
              >
                {" "}
                terms of service
              </span>
            </StyledLink>
            {hasTermsOfServiceError && (
              <FormHelperText
                error
                style={{
                  display: "block",
                  marginTop: theme.spacing(-1),
                }}
              >
                In order to create an account, you have to accept our terms of
                service.
              </FormHelperText>
            )}
            {status === "accountCreated" ? (
              <HighlightedInformation>
                We have created your account. Please click on the link in the
                email we have sent to you before logging in.
              </HighlightedInformation>
            ) : (
              <HighlightedInformation>
                Registration is disabled until we go live.
              </HighlightedInformation>
            )}

          </Fragment>


        }
        actions={
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
            disabled={isLoading}
          >
            Register
            {isLoading && <ButtonCircularProgress />}
          </Button>

        }
      />

      );
    </form>
  )
}
export default withStyles(styles, { withTheme: true })(RegisterDialog);
