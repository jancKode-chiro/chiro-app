import React, { Fragment } from "react";

import Settings2 from "../settings/settings2";
import Settings1 from "../settings/settings1";

function SettingsArea(props: any) {
  const { pushMessageToSnackbar } = props;
  return (
    <Fragment>
      <Settings1 pushMessageToSnackbar={pushMessageToSnackbar} />
      <Settings2 pushMessageToSnackbar={pushMessageToSnackbar} />
    </Fragment>
  );
}
export default SettingsArea;
