
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated'


const animatedComponents = makeAnimated();

const countryOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'User', label: 'User' },

]

const customStyles: StylesConfig = {
  input: (styles) => ({
    ...styles,
    height: '40px',
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
      color: 'rgb(61 151 122 / 70%)'
    }
  }
}

const AddSelect = () => {
  return (
    <Select
      className='test-test'
      closeMenuOnSelect={false}
      components={animatedComponents}
      options={countryOptions}
      styles={customStyles}
      placeholder='Select Role...'
    />
  )
}

export default AddSelect