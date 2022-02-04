import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { styles } from "./forgot-password-dialog.styles";
import { forgotUserPassword } from '../../api/users';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth-context';
import { ACTIVATE_ACCOUNT_PATH } from '../../constants/paths';
// import { StyledLink } from "../../components/link/link";
import ButtonCircularProgress from "../../components/common/button/button-circular-progress/button-circular-progress";

type InputProps = {
  email: string;
};

function ChangePassword(props: any) {
  const { onClose, classes, setLoginStatus } = props;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit
  } = useForm();
  const { setInputEmail } = useAuth();
  const history = useHistory();

  const sendPasswordEmail = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setLoginStatus("verificationEmailSend");
      setIsLoading(false);
      onClose();
    }, 1500);
  }, [setIsLoading, setLoginStatus, onClose]);

  const submitHandler: SubmitHandler<InputProps> = async (
    data
  ): Promise<void> => {
    setInputEmail(data.email);
    await forgotUserPassword(data.email);
    await history.push({
      pathname: ACTIVATE_ACCOUNT_PATH,
      state: 'forgotPassword',
    });

    await toast.info('Please check your email for the verification code.');
  };

  return (
    <Dialog
      open
      hideBackdrop
      onClose={onClose}
      disableBackdropClick={isLoading}
      disableEscapeKeyDown={isLoading}
      maxWidth="xs"
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent className={classes.dialogContent}>
          <Typography paragraph>
            Enter your email address below and we will send you instructions on
            how to reset your password.
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Email Address"
            autoFocus
            type="email"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isLoading}
          >
            Reset password
            {isLoading && <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
export default withStyles(styles, { withTheme: true })(ChangePassword);
