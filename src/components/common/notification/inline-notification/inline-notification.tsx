import React from 'react'
import { ErrorMessage } from "@hookform/error-message";
import _ from 'lodash/fp';

import './inline-notification.styles.scss'

type InlineErrorMessageProps = {
  errors: object;
  name: string
}

export const InlineMultipleErrorMessage = ({ errors, name }: InlineErrorMessageProps) => {
  console.log('Error', errors)
  return (

    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => {
        console.log("messages", message);
        return message
          ? _.entries(message).map(([type, message]: [string, any]) => (
            <p className='inline-error' key={type}>{message}</p>
          ))
          : null;
      }}
    />

  )
}

export const InlineSingleErrorMessage = ({ errors, name }: InlineErrorMessageProps) => {
  return (
    <div className='inline-error'>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p>{message}</p>}
      />
    </div>
  )
}