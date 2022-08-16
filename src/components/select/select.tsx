
import React from 'react'

import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated'
import './select.styles.scss'

const animatedComponents = makeAnimated();

const defaultOptions = [
  { value: 'Solo', label: 'Solo' },
  { value: 'Solo(1)', label: 'Solo(1)' },
  { value: 'Test', label: 'Test' },
  { value: 'Pilot', label: 'Pilot' },
  { value: 'Programmer', label: 'Programmer' },
  { value: 'Captain', label: 'Captain' },
  { value: 'Mechanic', label: 'Mechanic' },


]

const customStyles: StylesConfig = {
  input: (styles) => ({
    ...styles,
    height: '52px',
    color: 'transparent',
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'transparent'
    }
  },
  multiValueLabel: styles => {
    return {
      color: 'rgb(54 179 126 / 61%)'
    }
  }
}


// const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
//   <label style={{ marginRight: '1em' }}>
//     <input type="checkbox" {...props} />
//     {children}
//   </label>
// );



const CustomSelect = ({ options = defaultOptions, onChange, isDisabled }: any) => {
  return (
    <Select
      closeMenuOnSelect
      components={animatedComponents}
      isMulti
      options={options}
      styles={customStyles}
      onChange={onChange}
      isDisabled={isDisabled}

    />
  )
}

export default CustomSelect