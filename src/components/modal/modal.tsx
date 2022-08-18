import { isUndefined } from 'lodash';
import React, { useReducer } from 'react'
import { Button, Grid, Modal } from 'semantic-ui-react'
import styled from 'styled-components';
import { updateTemplate } from '../../api/template';
import { useTemplate } from '../../context/template-context';

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
  const openCallbackHandler = () => {

    if (!isUndefined(type)) {
      const id = onOpenCallback();
      console.log('idididid', id)
      updateTemplate(id as string, title, content);
      setTemplateContent('')
      setTemplateTitle('')
    }
    onOpenCallback();
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
          <Modal.Actions>
            <Button onClick={() => { dispatch({ type: 'CLOSE_MODAL' }); onCloseCallback && onCloseCallback() }} negative>
              {onCloseButtonText}
            </Button>

            <Button onClick={() => { openCallbackHandler(); dispatch({ type: 'CLOSE_MODAL' }) }} positive>
              {onOpenButtonText}
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    </Grid>
  )
}

export default CustomModal


const StyledGrid = styled(Grid)`
  margin-top: 0 ;
`