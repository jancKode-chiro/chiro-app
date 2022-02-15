import React, { memo, useCallback, useState, useEffect, Fragment } from "react";
import { withRouter } from 'react-router';
import LazyLoadAddBalanceDialog from "../subscription/lazy-load-balance/lazy-load-balance";

import './dashboard.styles.scss';
import NavBar from './navigation/navigation-bar/navigation-bar';


const Dashboard = ({ isNavbar, children }: any) => {

  const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState<{}>();


  const openAddBalanceDialog = useCallback(() => {
    setIsAddBalanceDialogOpen(true);
  }, [setIsAddBalanceDialogOpen]);

  const closeAddBalanceDialog = useCallback(() => {
    setIsAddBalanceDialogOpen(false);
  }, [setIsAddBalanceDialogOpen]);

  const onPaymentSuccess = useCallback(() => {
    setPushMessageToSnackbar({
      text: "Your balance has been updated.",
    });
    setIsAddBalanceDialogOpen(false);
  }, [setIsAddBalanceDialogOpen]);

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );



  return (

    <div className='dashboard'>
      <LazyLoadAddBalanceDialog
        open={isAddBalanceDialogOpen}
        onClose={closeAddBalanceDialog}
        onSuccess={onPaymentSuccess}
      />
      <NavBar openAddBalanceDialog={openAddBalanceDialog} />
      <div className='dashboard'>
        <div className='dashboard-content-wrapper'>{children}</div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
