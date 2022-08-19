import { isUndefined } from 'lodash';
import React, { useEffect, useReducer, useState } from 'react'
import { Grid, Modal } from 'semantic-ui-react'
import { Button } from '@mui/material';

import { updateTemplate } from '../../api/template';
import { useTemplate } from '../../context/template-context';
import ButtonCircularProgress from '../common/button/button-circular-progress/button-circular-progress';

type CutomModalProps = {
  buttonTriggerText: string;
  headerText: string;
  contentText: string;
  onCloseButtonText: string;
  onOpenButtonText: string;
  onCloseCallback?: () => void;
  onOpenCallback: () => void | string;
  customComponent?: JSX.Element
  children?: JSX.Element,
  type?: string;
  // openModal: boolean
}

function modalReducer(state: any, action: any) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, open: true }
    case 'CLOSE_MODAL':
      return { ...state, open: false }
  }
}

const CustomModal = ({
  buttonTriggerText,
  headerText,
  contentText,
  onCloseButtonText,
  onOpenButtonText,
  onCloseCallback,
  onOpenCallback,
  customComponent,
  type,
  children,
  // openModal
}: CutomModalProps) => {
  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
  })
  const { open } = state;
  const { title, content, setTemplateContent, setTemplateTitle } = useTemplate()
  const [loading, setLoading] = useState(false);

  const openCallbackHandler = () => {

    if (!isUndefined(type)) {
      const id = onOpenCallback();
      updateTemplate(id as string, title, content);
      setTemplateContent('')
      setTemplateTitle('')
    } else {
      onOpenCallback();
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch({ type: 'CLOSE_MODAL' })
    }, 2000)

  }

  const onClickHandler = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    onCloseCallback && onCloseCallback();
  }

  return (
    <Grid columns='1'>
      <Grid.Column>
        <Modal
          closeOnDimmerClick={false}
          open={open}
          onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
          trigger={customComponent}
        >
          <Modal.Header>{headerText}</Modal.Header>
          <Modal.Content>
            {children ? children : <p>{contentText}</p>}
          </Modal.Content>
          <Modal.Actions >
            <Button size='large' onClick={() => onClickHandler()} color='error'>
              {onCloseButtonText}
            </Button>
            <Button size='large' onClick={() => openCallbackHandler()} color='success' >
              {loading ? <ButtonCircularProgress /> : onOpenButtonText}
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    </Grid >
  )
}

export default CustomModal
