import React, { useReducer } from 'react'
import { Button, Grid, Modal } from 'semantic-ui-react'

type CutomModalProps = {
  buttonTriggerText: string;
  headerText: string;
  contentText: string;
  onCloseButtonText: string;
  onOpenButtonText: string;
  onCloseCallback?: () => void;
  onOpenCallback?: () => void;
  customComponent?: JSX.Element
  openModal: boolean
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
  openModal
}: CutomModalProps) => {
  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
  })
  const { open } = state;

  return (
    <Grid columns='1'>
      <Grid.Column>
        <Modal
          closeOnDimmerClick={false}
          open={openModal}
          onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
          trigger={<Button>{buttonTriggerText}</Button>}
        >
          <Modal.Header>{headerText}</Modal.Header>
          <Modal.Content>
            <p>{contentText}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => { dispatch({ type: 'CLOSE_MODAL' }) }} negative>
              {onCloseButtonText}
            </Button>

            <Button onClick={() => { dispatch({ type: 'CLOSE_MODAL' }) }} positive>
              {onOpenButtonText}
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    </Grid>
  )
}

export default CustomModal
