import React, { Fragment, useEffect } from "react";

import { Typography, Box } from "@material-ui/core";
import SettingsArea from '../settings-area/settings-area'
import UserDataArea from '../userdata-area/userdata-area'
import AccountInformationArea from '../account-information-area/account-infomration-area';
import StatisticsArea from '../statistics-area/statistics-area'
import NavBar from "../../../home/navigation/nav-bar";

function Dashboard(props: any) {
  const {
    selectDashboard,
    CardChart,
    statistics,
    toggleAccountActivation,
    pushMessageToSnackbar,
    targets,
    setTargets,
    isAccountActivated,
  } = props;

  // useEffect(selectDashboard, [selectDashboard]);

  return (
    <Fragment>
      {/* <NavBar /> */}
      {/* <StatisticsArea CardChart={CardChart} data={statistics} /> */}

      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Your Account
        </Typography>
      </Box>
      <AccountInformationArea
        isAccountActivated={isAccountActivated}
        toggleAccountActivation={toggleAccountActivation}
      />
      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Settings
        </Typography>
      </Box>
      <SettingsArea pushMessageToSnackbar={pushMessageToSnackbar} />
      <UserDataArea
        pushMessageToSnackbar={pushMessageToSnackbar}
        targets={targets}
        setTargets={setTargets}
      />
    </Fragment>
  );
}
export default Dashboard;
