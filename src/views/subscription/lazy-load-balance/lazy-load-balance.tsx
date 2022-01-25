import React, { useState, useEffect, Fragment } from "react";

function LazyLoadAddBalanceDialog(props: any) {
  const { open, onClose, onSuccess } = props;
  const [AddBalanceDialog, setAddBalanceDialog] = useState<any>(null);
  const [hasFetchedAddBalanceDialog, setHasFetchedAddBlanceDialog] = useState(false);

  useEffect(() => {
    if (open && !hasFetchedAddBalanceDialog) {
      setHasFetchedAddBlanceDialog(true);
      import("../add-balance-dialog/add-balance-dialog").then(Component => {
        setAddBalanceDialog(() => Component.default);
      });
    }
  }, [open, hasFetchedAddBalanceDialog, setHasFetchedAddBlanceDialog, setAddBalanceDialog]);

  return (
    <Fragment>
      {AddBalanceDialog && (
        <AddBalanceDialog
          open={open}
          onClose={onClose}
          onSuccess={onSuccess}
        ></AddBalanceDialog>
      )}
    </Fragment>
  );

}

export default LazyLoadAddBalanceDialog;
